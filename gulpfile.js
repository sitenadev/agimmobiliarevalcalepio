const gulp = require('gulp')

const framework = 'bootstrap'

const paths = {
  assets: {
    css: 'assets/css',
    fonts: 'assets/fonts',
    img: 'assets/img/theme',
    js: 'assets/js'
  },
  sass: {
    entry: '_sass/*.scss',
    vendor: '_sass/vendor'
  },
  scripts: {
    entry: '_scripts/*.js'
  }
}

const cdnResources = {
  css: [
    { url: 'https://cdn.jsdelivr.net/npm/aos@latest/dist/aos.css', rename: 'aos.min.css' },
    { url: 'https://cdn.jsdelivr.net/npm/leaflet@latest/dist/leaflet.min.css' },
    { url: 'https://cdn.jsdelivr.net/npm/tiny-slider@latest/dist/tiny-slider.css', rename: 'tiny-slider.min.css' }
  ],
  img: [
    'https://cdn.jsdelivr.net/npm/leaflet@latest/dist/images/layers.png',
    'https://cdn.jsdelivr.net/npm/leaflet@latest/dist/images/layers-2x.png',
    //'https://cdn.jsdelivr.net/npm/leaflet@latest/dist/images/marker-icon.png',
    //'https://cdn.jsdelivr.net/npm/leaflet@latest/dist/images/marker-icon-2x.png',
    'https://cdn.jsdelivr.net/npm/leaflet@latest/dist/images/marker-shadow.png'
  ],
  js: [
    { url: 'https://cdn.jsdelivr.net/npm/aos@latest/dist/aos.js', rename: 'aos.min.js' },
    { url: 'https://cdn.jsdelivr.net/npm/leaflet@latest/dist/leaflet.min.js' },
    { url: 'https://cdn.jsdelivr.net/npm/tiny-slider@latest/dist/min/tiny-slider.js', rename: 'tiny-slider.min.js' }
  ]
}

const clean = require('../gulp/tasks/clean')(paths)
const frameworks = require('../gulp/tasks/frameworks')(paths, framework)
const { css, img, js } = require('../gulp/tasks/cdn')(paths, cdnResources)
const compileSass = require('../gulp/tasks/sass')(paths)
const compileJs = require('../gulp/tasks/scripts')(paths)
const googleFonts = require('../gulp/tasks/fonts')(paths)

function watch() {
  gulp.watch(paths.sass.entry, compileSass)
  gulp.watch(paths.scripts.entry, compileJs)
  gulp.watch('./fonts.list', googleFonts)
}

gulp.task('clean', clean)
gulp.task('frameworks', frameworks)
gulp.task('css', css)
gulp.task('img', img)
gulp.task('js', js)
gulp.task('cdn', gulp.parallel('css', 'img', 'js'))
gulp.task('compile-sass', compileSass)
gulp.task('compile-js', compileJs)
gulp.task('google-fonts', googleFonts)
gulp.task('build', gulp.parallel('compile-sass', 'compile-js'))
gulp.task('watch-only', watch)
gulp.task('watch', gulp.series('build', watch))
gulp.task('default', gulp.series('clean', 'frameworks', 'cdn', 'google-fonts', 'build'))
