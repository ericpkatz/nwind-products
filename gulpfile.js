var gulp = require('gulp');
var db = require('./db');

gulp.task('seed', function(){
  return db.seed();
});
