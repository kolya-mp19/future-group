//Подключаем локальные пакеты
var gulp = require("gulp");
var sass = require("gulp-sass");

//Определение задачи по умолчанию в GULP
gulp.task("default", function () {
    console.log(10);
})

//Определение новой задачи в GULP для SCSS и SASS 
gulp.task("scss", function () {
    //**- ищем везде, включая вложенные папки
    gulp.src(["./samples/**/*.scss", "./samples/**/*.sass"])
        //Компиляция scss или sass в css формат
    .pipe(sass())
        //Вывод ошибки, без окончания компиляции
  .pipe(sass().on("error", sass.logError))
        //Путь компиляции файлов
.pipe(gulp.dest("./samples"))
})

//Отслеживание изменений
gulp.task("scss:watch", function () {
    //Находим папку и отмечаем, за каким файлом необходимо наблюдать, если он найден - выполняем задание "scss"
    gulp.watch(["./samples/**/*.scss", "./samples/**/*.sass"], ["scss"])
})