const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const { JSDOM } = require('jsdom')
const browserSync = require('browser-sync')
const renderHelper = require('real-world-website-render-helper')
const pug = require('pug')
const sass = require('node-sass')
const globImporter = require('node-sass-glob-importer')
const red = require('ansi-red')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const csswring = require('csswring')
const { rollup } = require('rollup')
const del = require('del')
const chokidar = require('chokidar')
const cpx = require('cpx')
const { series, parallel } = require('bach')
const rollupConfigs = require('./rollup.config')

const isProd = process.argv[2] === '--prod'

let blogPosts = null

const loadBlogPosts = async () => {
  const { window: { document } } = await JSDOM.fromURL(
    'https://yuheiy.hatenablog.com/feed',
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

const writeFileAsync = promisify(fs.writeFile)

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

const bs = browserSync.create()

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
  const opts = { ignoreInitial: true }
  chokidar.watch('src/css/**/*.scss', opts).on('all', css)
  chokidar.watch('src/js/**/*.js', opts).on('all', js)
  chokidar.watch(['src/html/**/*', 'public/**/*'], opts).on('all', bs.reload)
  done()
}

const html = () => {
  return renderHelper.build(renderHelperConfig)
}

const copy = () => {
  return Promise.all(
    ['public/**/*', 'public/.nojekyll'].map(
      (src) => new Promise((resolve) => cpx.copy(src, 'dist', resolve)),
    ),
  )
}

if (isProd) {
  series(
    clean,
    parallel(series(parallel(loadBlogPosts, css, js), html), copy),
  )()
} else {
  series(clean, parallel(loadBlogPosts, css, js), serve, watch)()
}
