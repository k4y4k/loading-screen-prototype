const gulp = require('gulp')
const del = require('del')
const gulpLoadPlugins = require('gulp-load-plugins')
const browserSync = require('browser-sync').create()
const rollup = require('rollup-stream')
const source = require('vinyl-source-stream')

const plugins = gulpLoadPlugins()

const clean = () => del(['out', 'tmp'])

const minifyImages = () =>
  gulp.src('src/img/*').pipe(plugins.imagemin()).pipe(gulp.dest('out/img'))

const preprocessHTML = () => {
  const target = gulp.src('src/pug/index.pug')
  // It's not necessary to read the files (will speed up things),
  // we're only after their paths:
  const sources = gulp.src(['out/**/*.js', 'out/**/*.css'], { read: false })

  return target
    .pipe(plugins.inject(sources, { ignorePath: '/out/' }))
    .pipe(gulp.dest('tmp'))
}

const bundle = () =>
  rollup({
    input: 'src/js/index.js',
    format: 'iife',
    name: 'woomy',
  })
    .pipe(source('index.js'))
    .pipe(gulp.dest('./out/js'))

const compileHTML = () =>
  // the .pug files in tmp/ have been preprocessed
  gulp
    .src('tmp/*.pug')
    .pipe(plugins.pug({ verbose: true }))
    .pipe(gulp.dest('out/'))

const cleanTemp = () => del(['tmp/**/*'])

const browsersync = () => {
  browserSync.init({
    server: {
      baseDir: 'out/',
    },
  })
}

exports.default = gulp.series(
  clean,
  minifyImages,
  bundle,
  preprocessHTML,
  compileHTML,
  cleanTemp,
  browsersync
)

exports.clean = clean
