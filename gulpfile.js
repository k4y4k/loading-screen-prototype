const gulp = require('gulp')
const del = require('del')
const gulpLoadPlugins = require('gulp-load-plugins')
const browserSync = require('browser-sync').create()
const { execSync } = require('child_process')
const cleanCSS = require('gulp-clean-css')

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

const ciPreprocessHTML = () => {
  const target = gulp.src('src/pug/index.pug')
  // It's not necessary to read the files (will speed up things),
  // we're only after their paths:
  const sources = gulp.src(['out/**/*.js', 'out/**/*.css'], { read: false })

  return target
    .pipe(
      plugins.inject(sources, {
        ignorePath: '/out/',
        addPrefix: 'loading-screen-prototype',
      })
    )
    .pipe(gulp.dest('tmp'))
}

const compileJS = (done) => {
  execSync(
    'parcel build ./src/js/index.js -d out/ --no-source-maps --public-url ./loading-screen-prototype/',
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

const bundleJS = (done) => {
  execSync(
    'parcel build ./src/js/index.js -d out/',
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

const reload = (done) => {
  browserSync.reload()
  done()
}

const compileCSS = () =>
  gulp
    .src('src/**/*.css')
    .pipe(
      plugins.autoprefixer({
        cascade: false,
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest('out/'))

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

  gulp.watch('src/**/*.js', gulp.series(bundleJS, reload))
  gulp.watch('src/**/*.css', gulp.series(compileCSS, reload))
  gulp.watch('src/**/*.pug', gulp.series(preprocessHTML, compileHTML, reload))
}

exports.ci = gulp.series(
  clean,
  minifyImages,
  compileJS,
  compileCSS,
  ciPreprocessHTML,
  compileHTML,
  cleanTemp
)

exports.default = gulp.series(
  clean,
  minifyImages,
  bundleJS,
  compileCSS,
  preprocessHTML,
  compileHTML,
  cleanTemp,
  browsersync
)

exports.clean = clean
exports.bundleJS = bundleJS
exports.compileJS = compileJS
