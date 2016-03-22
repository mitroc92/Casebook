var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify'); 

//convert sass file naar css file
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) 
    .pipe(gulp.dest('app/css'))
    .pipe(sass({
    style: 'compressed'
  }))
  .pipe(gulp.dest('dist/css'));
});

//optimaliseer img files
gulp.task('jpgs', function() {
    return gulp.src('app/img/*.jpg')
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest('dist/img'));
});

//minify js files & plaats in dist map
gulp.task('uglify', function(){
  gulp.src('app/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
  });

//watch tasks
//bij veranderingen van een bestand update de dist map
gulp.task('watch', function(){
  //als js bestanden veranderen --> uglify
  gulp.watch('app/js/*.js',['uglify']);
  //als sass files veranderen --> sass taak
  gulp.watch(app/scss/**/*.scss,['sass']);
  
  
});

//alle functies uitvoeren vervolgens start watch task
gulp.task('default', ['sass','jpgs','uglify','watch']
  );