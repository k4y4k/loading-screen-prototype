const gulp = require('gulp')
const del = require('del')
const gulpLoadPlugins = require('gulp-load-plugins')
const browserSync = require('browser-sync').create()
const { execSync } = require('child_process')

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

const bundle = (done) => {
  execSync(
    'NODE_ENV=development parcel build ./src/js/index.js -d out/js --experimental-scope-hoisting  --no-minify --no-source-maps',
    // eslint-disable-next-line func-names
    function (err, stdout, stderr) {
      // eslint-disable-next-line no-console
      console.log(stdout)
      // eslint-disable-next-line no-console
      console.log(stderr)
    }
  )

  done()
}

const reload = () => browserSync.reload()

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

  gulp.watch('src/**/*.js', gulp.series(bundle, reload))
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
