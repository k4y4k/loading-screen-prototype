const gulp = require('gulp')
const del = require('del')
const gulpLoadPlugins = require('gulp-load-plugins')
const browserSync = require('browser-sync').create()

const plugins = gulpLoadPlugins()

const clean = () => del(['out/**/*', 'tmp/**/*'])

const minifyImages = () =>
  gulp.src('src/img/*').pipe(plugins.imagemin()).pipe(gulp.dest('out/img'))

const preprocessHTML = () => {
  var target = gulp.src('src/pug/index.pug')
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['src/**/*.js', 'src/**/*.css'], { read: false })

  return target.pipe(plugins.inject(sources)).pipe(gulp.dest('tmp'))
}

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
  preprocessHTML,
  compileHTML,
  cleanTemp,
  browsersync
)
