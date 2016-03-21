'use strict';

/*
 * DEPENDENCIAS
 */

// REQUIREMENTS PACKAGES
var gulp          = require('gulp'),
    sassGlob      = require("gulp-sass-glob"),  // Nos permite usar asteriscos para importar de manera veloz todos los ficheros sass al main.sass: @import regions/**/*, Ventajas: cada vez que creemos un fichero nuevo, no tendremos que añadirlo manualmente al app.sass
    convertSass   = require("gulp-sass"),       // Convierte sass a css en formato comprimido o sin comprimir (Outputstyle: compressed or expanded) -> https://github.com/dlmanning/gulp-sass
    sourcemaps    = require("gulp-sourcemaps"), // Crea un mapeado del fichero css minificado para poder tener un seguimiento de los directorios desde el navegador. -> https://github.com/dlmanning/gulp-sass
    liveReload    = require('gulp-livereload'), // Recarga el navegador cuando se producen cambios en los ficheros indicados.
    rename        = require('gulp-rename'),     // Renombra ficheros
    concat        = require('gulp-concat'),     // Concatena ficheros
    minifyJs      = require('gulp-uglify');     // Minifica ficheros javascript

// TASKS

    // COMPILE CSS
    gulp.task('styles', function () {
      return gulp
      .src('app/styles/app.sass')               // Obtenemos la ruta del fichero principal de sass
      .pipe(sourcemaps.init())                  // Creamos a partir de él, el mapeo para obtener el desglose en el inspector de elementos.
      .pipe(convertSass({outputStyle: 'compressed'}).on('error', convertSass.logError))   // Convertimos el sass a css minificado, si no hay error de sintaxis -> https://web-design-weekly.com/2014/06/15/different-sass-output-styles/
      .pipe(sourcemaps.write())
      .pipe(rename('bluelephant.css'))          // Renombramos el fichero
      .pipe(gulp.dest('assets/css'));           // Elegimos la ruta de salida para el fichero css minificado.
    });

    // COMPILE JS
    gulp.task('js', function(){
     return gulp
       .src('app/js/*.js')                      // Obtenemos la ruta donde se albergan todos los ficheros js
       .pipe(concat('app.js'))                  // Unificamos todos los ficheros en un solo fichero javascript
       .pipe(minifyJs())                        // Minificamos ese fichero js
       .pipe(rename('bluelephant.js'))          // Lo renombramos
       .pipe(gulp.dest('assets/js'));           // Elegimos ruta de salida para el fichero
    });

    // DEPLOY
    gulp.task('deploy', ['styles', 'js']);

    // WATCHER
    gulp.task('watch', ['deploy'], function() {
      //liveReload.listen();
      gulp.watch('app/**/*.sass', ['deploy']);  // En cuanto cambie algun fichero con extension sass, js, html,  lanzamos la tarea "deploy"
      gulp.watch('app/**/*.js'  , ['deploy']);
      gulp.watch('app/**/*.html', ['deploy']);
    });
