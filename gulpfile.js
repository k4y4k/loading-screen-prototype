const gulp = require('gulp')
const del = require('del')
const gulpLoadPlugins = require('gulp-load-plugins')
const plugins = gulpLoadPlugins()

function minifyImages() {
  return gulp
    .src('src/img/*')
    .pipe(plugins.imagemin())
    .pipe(gulp.dest('out/img'))
}

const clean = () => del(['out/**/*'])

exports.default = gulp.series(clean, minifyImages)
