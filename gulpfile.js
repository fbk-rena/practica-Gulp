const gulp = require('gulp');
const uglify = require('gulp-uglify')
const sass = require('gulp-sass');
const obfuscate = require('gulp-obfuscate');
const browserSync = require('browser-sync').create();

const rutas = {
    js: "./src/js/*.js",
    scss: "./src/scss/main.scss",
    html: "./src/*.html",
};
gulp.task('moverHtml', () => {
    gulp.src(rutas.html)
    .pipe( gulp.dest("public"));  
});

gulp.task('moverJS', () => {
    gulp.src(rutas.js)
        .pipe(uglify())
        .pipe(obfuscate())
    .pipe(gulp.dest("public/js/"));
});

gulp.task('prepararCss', () => {
    gulp.src(rutas.scss)
        .pipe(sass({outputStyle: "compressed"})
            .on('error', sass.logError))
    .pipe(gulp.dest("public/css/"))
});

gulp.task('watchCss', () => {
    browserSync.init({
        //crea servidor y da la ruta donde buscar el index
        server: {
            baseDir: "./public"
        }
    });
    //vigila los cambios, tiene dos parametros la ruta que vigila y la tarea que ejecuta cuando exista algun cambio en esa ruta
    gulp.watch(rutas.scss, ['watch'])
});
//
gulp.task('watch', ['prepararCss','moverHtml','moverJS' ], () => {
    //recarga el servidor 
    browserSync.reload();
})
