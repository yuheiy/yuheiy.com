const gulp = require('gulp')
const browserSync = require('browser-sync')

const isDev = process.env.NODE_ENV !== 'production'

const html = () => {
  const path = require('path')
  const fs = require('fs')
  const plumber = require('gulp-plumber')
  const data = require('gulp-data')
  const pug = require('gulp-pug')

  return gulp.src([
    'src/html/**/*.pug',
    '!src/html/partial',
  ])
    .pipe(plumber())
    .pipe(data(file => {
      const metaData = JSON.parse(fs.readFileSync('src/html/metadata.json', 'utf8'))
      const pageDataPath = file.path.replace(/\.pug$/, '.json')
      const pageData = fs.existsSync(pageDataPath) ? JSON.parse(fs.readFileSync(pageDataPath)) : null
      const fullPathOfCurrentPage = `/${path.relative('src/html', file.path)}`
        .replace(/\.pug$/, '')
        .replace(/\/index$/, '/')

      return {
        ...metaData,
        ...pageData,
        currentPath: fullPathOfCurrentPage,
      }
    }))
    .pipe(pug())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
}

const css = () => {
  const sourcemaps = require('gulp-sourcemaps')
  const sass = require('gulp-sass')
  const postcss = require('gulp-postcss')

  const AUTOPREFIXER_BROWSERS = [
    'last 1 version',
    '>5% in JP',
  ]

  return gulp.src('src/css/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      require('autoprefixer')({
        browsers: AUTOPREFIXER_BROWSERS,
        cascade: false,
      }),
      ...(isDev ? [] : [
        require('csswring')(),
      ]),
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/assets'))
    .pipe(browserSync.stream({match: '**/*.css'}))
}

let compiler

const js = done => {
  const gutil = require('gulp-util')

  if (!compiler) {
    const webpack = require('webpack')
    const webpackConfig = require('./webpack.config.js')
    compiler = webpack(webpackConfig)
  }

  compiler.run((err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString({colors: true}))

    browserSync.reload()
    done()
  })
}

const copy = () =>
  gulp.src('public/**/*')
    .pipe(gulp.dest('dist'))

export const build = gulp.parallel(html, css, js, copy)

const serve = done => {
  browserSync.init({
    notify: false,
    ui: false,
    server: 'dist',
    ghostMode: false,
    open: false,
  }, done)
}

const watch = done => {
  gulp.watch('src/html/**/*', html)
  gulp.watch('src/css/**/*.scss', css)
  gulp.watch('src/js/**/*.js', js)
  gulp.watch('public/**/*', copy)

  done()
}

export default gulp.series(
  build,
  serve,
  watch,
)
