<<<<<<< HEAD
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'), 
    plumber = require('gulp-plumber'),
    livereload = require ('gulp-livereload'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso');

//convert sass file naar css file
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(prefix('last 2 versions'))
    .pipe(gulp.dest('app/css'))
    .pipe(sass({style: 'compressed'}))
  //zorgt ervoor dat alle css3 opties automatiesch de juiste prefixes krijgen voor browsers die geen css3 opties ondersteunen
    .pipe(prefix('last 2 version', 'safari 5', 'ios 6', 'ie 9'))
  //voegt alle cssfiles samen in een bestand
    .pipe(concat('style.css'))
    .pipe(gulp.dest('app/css'))
    //reaload pagina als (s)css bestanden zijn opgeslagen
    .pipe(livereload());
});

//verzamel alle css bestanden, bundel deze en minify plaat vervolgens in dist/css
gulp.task('css', function(){
  return gulp.src('app/css/**/*.css')
    .pipe(plumber())
    .pipe(concat('style.css'))
    .pipe(csso())
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload());
})


//optimaliseer img files
gulp.task('jpgs', function() {
    return gulp.src('app/img/**/*')
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest('dist/img'))
    .pipe(livereload());
});

//minify js files & plaats in dist map
gulp.task('uglify', function(){
  gulp.src('app/js/*.js')
    .pipe(plumber())
    .pipe(uglify())
  //voegt alle jsfiles samen in een bestand
    .pipe(concat('script.js'))
    .pipe(gulp.dest('dist/js'))
  //reaload pagina als js bestanden zijn opgeslagen
    .pipe(livereload());
  });

//watch tasks
//bij veranderingen van een bestand update de dist map
gulp.task('watch', function(){
  
  //zorgt ervoor dat live reload werkt
  var server = livereload({start: true});
  
  //nieuwe foto's direct comprimeren naar dist map
  gulp.watch('app/img/*',['jpgs']);
  //als js bestanden veranderen --> uglify
  gulp.watch('app/js/*.js',['uglify']);
  //als sass files veranderen --> sass taak
  gulp.watch('app/scss/**/*.scss',['sass']);
  //als css veranderd bundel&minify css plaats deze in dist map
  gulp.watch('app/css/**/*.css',['css']);
  
  
});

//alle functies uitvoeren vervolgens start watch task
gulp.task('default', ['sass','jpgs','uglify','css','watch']
=======
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
>>>>>>> fe7c3fddf49ff9aa94a82d1f514c5ecf21319ffd
  );