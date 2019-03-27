const gulp        = require('gulp');
const sass        = require('gulp-sass');
const browserSync = require('browser-sync').create();
const imagemin    = require('gulp-imagemin');
const del         = require('del');
const autoprefixer= require('gulp-autoprefixer');

const scssFiles = [
    "./scss/styles.scss"
]

function style() {
    return gulp.src(scssFiles)
    .pipe(sass({outputStyle: 'compressed'})).on('error', sass.logError)
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    //следит за добавлением новых картинок в папке imgPH, сжимает, переностит в папку img, удаляет из папки imgPH
    gulp.watch("./imgPH/*", gulp.series(compresImg, gulp.parallel(delImg)));

    gulp.watch("./scss/**/*.scss", style);
    gulp.watch("./*.html").on("change", browserSync.reload);
    gulp.watch("./js/**/*.js").on("change", browserSync.reload);
}

function compresImg() {
    return gulp.src('./imgPH/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./img'))
}

function delImg() {
    return del(["./imgPH/*"])
}

gulp.task("delImg", delImg);
gulp.task("compresImg", compresImg);
gulp.task("style", style);
gulp.task("watch", watch);