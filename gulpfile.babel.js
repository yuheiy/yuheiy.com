'use strict'

import path from 'path'
import fs from 'fs'
import del from 'del'
import gulp from 'gulp'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import gutil from 'gulp-util'
import plumber from 'gulp-plumber'
import gulpif from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import postcss from 'gulp-postcss'
import atImport from 'postcss-import'
import nested from 'postcss-nested'
import csso from 'gulp-csso'
import uglify from 'gulp-uglify'
import optimizejs from 'gulp-optimize-js'
import data from 'gulp-data'
import pug from 'gulp-pug'
import htmlmin from 'gulp-htmlmin'
import browserSync from 'browser-sync'
import browserify from 'browserify'
import watchify from 'watchify'

const production = process.env.NODE_ENV === 'production'
const development = !production

const server = browserSync.create()

const copy = () =>
  gulp.src('src/static/**/*', {since: gulp.lastRun(copy)})
    .pipe(gulp.dest('dist'))
    .pipe(server.stream())

const css = () => {
  const processors = [
    atImport,
    nested
  ]

  return gulp.src('src/css/style.css')
    .pipe(plumber(function (err) {
      console.error(err)
      this.emit('end')
    }))
    .pipe(gulpif(development, sourcemaps.init({loadMaps: true})))
    .pipe(postcss(processors))
    .pipe(gulpif(production, csso()))
    .pipe(gulpif(development, sourcemaps.write('./')))
    .pipe(gulp.dest('dist'))
    .pipe(server.stream({match: '**/*.css'}))
}

let isWatchifyEnabled = false

const enableWatchJs = done => {
  isWatchifyEnabled = true
  done()
}

const js = () => {
  const bundler = browserify({
    ...watchify.args,
    entries: 'src/js/main.js',
    debug: development
  })
    .transform('babelify')
    .transform('envify', {
      NODE_ENV: process.env.NODE_ENV
    })

  if (production) {
    bundler.plugin('licensify')
  }

  const bundle = () => bundler.bundle()
    .on('error', err => gutil.log('Browserify Error', err))
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulpif(development, sourcemaps.init({loadMaps: true})))
    .pipe(gulpif(production, uglify({
      preserveComments: 'license'
    })))
    .pipe(gulpif(production, optimizejs()))
    .pipe(gulpif(development, sourcemaps.write('./')))
    .pipe(gulp.dest('dist'))
    .pipe(server.stream({match: '**/*.js'}))

  if (isWatchifyEnabled) {
    const watcher = watchify(bundler)
    watcher.on('update', bundle)
    watcher.on('log', gutil.log)
  }

  return bundle()
}

const watchJs = gulp.series(enableWatchJs, js)

const html = () =>
  gulp.src([
    'src/html/**/*.pug',
    '!src/html/partial/**/*'
  ])
    .pipe(plumber())
    .pipe(data(file => {
      const metaData = JSON.parse(
        fs.readFileSync('src/html/metadata.json', 'utf8')
      )
      const pageDataFilePath = file.path.replace(/\.pug$/, '.json')
      const pageData = fs.readdirSync(
        path.dirname(pageDataFilePath)
      ).includes(
        path.basename(pageDataFilePath)
      )
        ? JSON.parse(fs.readFileSync(pageDataFilePath, 'utf8'))
        : null

      return {
        ...metaData,
        ...pageData
      }
    }))
    .pipe(pug())
    .pipe(gulpif(production, htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    })))
    .pipe(gulp.dest('dist'))
    .pipe(server.stream({match: '**/*.html'}))

const clean = () => del(['dist/*', '!dist/.git'], {dot: true})

export const serve = done => {
  server.init({
    notify: false,
    server: 'dist',
    ghostMode: false,
    open: false,
    reloadDebounce: 300
  })
  done()
}

const watch = () => {
  const assetsWatcher = gulp.watch('src/assets/**/*', copy)
  gulp.watch('src/css/**/*.css', css)
  const htmlWatcher = gulp.watch('src/html/**/*', html)

  assetsWatcher.on('unlink', file => {
    const filePathFromSrc = path.relative(path.resolve('src/static'), file)
    const destFilePath = path.resolve('dist', filePathFromSrc)
    del.sync(destFilePath)
  })

  htmlWatcher.on('unlink', file => {
    const filePathFromSrc = path.relative(path.resolve('src/html'), file)
    const destFilePath = path.resolve(
      'dist',
      filePathFromSrc.replace(/\.pug$/, '.html')
    )
    del.sync(destFilePath)
  })
}

export default gulp.series(
  clean,
  gulp.parallel(copy, css, watchJs, html),
  serve,
  watch
)

export const build = gulp.series(
  clean,
  gulp.parallel(copy, css, js, html)
)
