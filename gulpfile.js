const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const gulp = require('gulp')
const browserSync = require('browser-sync')
const { JSDOM } = require('jsdom')
const renderHelper = require('real-world-website-render-helper')
const pug = require('pug')
const sass = require('node-sass')
const globImporter = require('node-sass-glob-importer')
const red = require('ansi-red')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const csswring = require('csswring')
const { rollup } = require('rollup')
const rollupConfigs = require('./rollup.config')
const del = require('del')

const writeFileAsync = promisify(fs.writeFile)

const bs = browserSync.create()

const isProd = process.argv[2] === 'build'

let blogPosts = null

const loadBlogPosts = async () => {
  const { window: { document } } = await JSDOM.fromURL(
    'http://yuheiy.hatenablog.com/feed',
  )
  const posts = Array.from(document.querySelectorAll('entry')).map(
    (entryEl) => {
      const title = entryEl.querySelector('title').textContent
      const url = entryEl.querySelector('link').getAttribute('href')
      return { title, url }
    },
  )
  blogPosts = posts
}

const renderHelperConfig = {
  input: 'src/html',
  inputExt: 'pug',
  output: 'dist',
  outputExt: 'html',
  render: ({ src, filename }) => {
    return pug.render(src.toString(), {
      blogPosts,
      filename,
      basedir: 'src/html',
    })
  },
}

const css = async () => {
  let sassResult
  try {
    sassResult = await new Promise((resolve, reject) => {
      sass.render(
        {
          file: 'src/css/main.scss',
          importer: globImporter(),
          outFile: 'src/css/main.css',
          sourceMap: !isProd,
          sourceMapContents: true,
        },
        (err, result) => {
          if (err) {
            reject(err)
            return
          }
          resolve(result)
        },
      )
    })
  } catch (err) {
    const filePath = path.relative(__dirname, err.file)
    console.log(red(`Error in ${filePath}`))
    console.log(err.formatted.toString())
    return
  }

  const postcssResult = await postcss([
    autoprefixer({
      cascade: false,
    }),
    ...(isProd ? [csswring()] : []),
  ]).process(sassResult.css, {
    from: 'main.css',
    to: 'main.css',
    map: !isProd && {
      inline: true,
      prev: JSON.parse(sassResult.map),
    },
  })

  await writeFileAsync('src/html/main.css', postcssResult.css)
}

const js = () => {
  return Promise.all(
    rollupConfigs.map(async ([inputConfig, outputConfig]) => {
      const { write } = await rollup(inputConfig)
      return write(outputConfig)
    }),
  ).catch((err) => {
    console.log(err)
  })
}

const serve = (done) => {
  bs.init(
    {
      notify: false,
      ui: false,
      server: ['dist', 'public'],
      middleware: renderHelper.createRenderMiddleware(renderHelperConfig),
      ghostMode: false,
      open: false,
    },
    done,
  )
}

const clean = () => {
  return del('dist')
}

const watch = (done) => {
  const options = {
    delay: 50,
  }

  const reload = (done) => {
    bs.reload()
    done()
  }

  gulp.watch('src/css/**/*.scss', options, css)
  gulp.watch('src/js/**/*.js', options, js)
  gulp.watch(['src/html/**/*', 'public/**/*'], options, reload)
  done()
}

// prettier-ignore
gulp.task('default', gulp.series(
  clean,
  gulp.parallel(loadBlogPosts, css, js),
  serve,
  watch,
))

const html = () => {
  return renderHelper.build(renderHelperConfig)
}

const copy = () => {
  return gulp.src('public/**/*', { dot: true }).pipe(gulp.dest('dist'))
}

// prettier-ignore
gulp.task('build', gulp.series(
  clean,
  gulp.parallel(
    gulp.series(
      gulp.parallel(loadBlogPosts, css, js),
      html,
    ),
    copy,
  ),
))
