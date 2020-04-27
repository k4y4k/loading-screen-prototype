const gulp = require('gulp')
const imagemin = require('gulp-imagemin')

function images(done) {
  gulp.src('src/img/*').pipe(imagemin()).pipe(gulp.dest('out/img'))
}

function defaultTask(done) {
  // place code for your default task here
  done()
}

exports.default = defaultTask
