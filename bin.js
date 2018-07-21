const del = require('del')
const vfs = require('vinyl-fs')
const rename = require('gulp-rename')
const gulpif = require('gulp-if')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const globImporter = require('node-sass-glob-importer')
const postcss = require('gulp-postcss')
const gapProperties = require('postcss-gap-properties')
const autoprefixer = require('autoprefixer')
const csswring = require('csswring')
const { rollup } = require('rollup')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const { uglify } = require('rollup-plugin-uglify')
const { minify } = require('uglify-es')
const { JSDOM } = require('jsdom')
const pug = require('pug')
const compileHelper = require('real-world-website-compile-helper')
const browserSync = require('browser-sync')
const { series, parallel } = require('bach')

let isDebug = true

const clean = () => {
  return del('dist')
}

let sassImporters = null
let postcssPlugins = null

const css = () => {
  if (!sassImporters) {
    sassImporters = [globImporter()]
  }

  if (!postcssPlugins) {
    postcssPlugins = [
      gapProperties(),
      autoprefixer({
        cascade: false,
      }),
      !isDebug && csswring(),
    ].filter(Boolean)
  }

  return vfs
    .src('src/main.scss')
    .pipe(rename({ suffix: '.bundle' }))
    .pipe(gulpif(isDebug, sourcemaps.init()))
    .pipe(sass({ importer: sassImporters }).on('error', sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(gulpif(isDebug, sourcemaps.write()))
    .pipe(vfs.dest('src'))
}

let rollupConfig = null

const js = async () => {
  if (!rollupConfig) {
    rollupConfig = [
      {
        input: './src/main.mjs',
        plugins: [
          resolve(),
          commonjs(),
          !isDebug &&
            uglify(
              {
                output: {
                  comments: (_, { value, type }) => {
                    if (type === 'comment2') {
                      // multiline comment
                      return /@preserve|@license|@cc_on/i.test(value)
                    }
                  },
                },
              },
              minify,
            ),
        ].filter(Boolean),
      },
      {
        file: './src/main.bundle.mjs',
        format: 'es',
        sourcemap: isDebug && 'inline',
      },
    ]
  }

  try {
    const { write } = await rollup(rollupConfig[0])
    return write(rollupConfig[1])
  } catch (err) {
    console.log(err)
  }
}

let blogPosts = null

const loadBlogPosts = async () => {
  if (!blogPosts) {
    const dom = await JSDOM.fromURL('https://yuheiy.hatenablog.com/feed')
    const posts = [...dom.window.document.querySelectorAll('entry')].map(
      (entryEl) => {
        const title = entryEl.querySelector('title').textContent
        const url = entryEl.querySelector('link').getAttribute('href')
        return { title, url }
      },
    )
    blogPosts = posts
  }

  return blogPosts
}

const htmlCompilerConfig = {
  input: 'src',
  inputExt: '.pug',
  output: 'dist',
  outputExt: '.html',
  compile: async ({ src, filename }) => {
    return pug.render(String(src), {
      blogPosts: await loadBlogPosts(),
      filename,
      basedir: 'src',
    })
  },
}

const serve = (done) => {
  const bs = browserSync.create()
  const compileHtmlMiddleware = compileHelper.buildCompileMiddleware(
    htmlCompilerConfig,
  )

  bs.init(
    {
      notify: false,
      ui: false,
      server: 'public',
      files: [
        {
          match: ['src/**/*.pug', 'src/main.bundle.{css,mjs}'],
          fn: bs.reload,
        },
        {
          match: 'src/**/*.scss',
          fn: css,
        },
        {
          match: ['src/**/*.mjs', '!src/main.bundle.mjs'],
          fn: js,
        },
      ],
      watchEvents: ['add', 'change', 'unlink'],
      middleware: compileHtmlMiddleware,
      ghostMode: false,
      open: false,
    },
    done,
  )
}

const html = () => {
  return compileHelper.buildFiles(htmlCompilerConfig)
}

const copy = () => {
  return vfs.src('public/**/*', { dot: true }).pipe(vfs.dest('dist'))
}

const script = process.argv[2]
let main = null

switch (script) {
  case 'start': {
    main = series(clean, parallel(css, js), serve)
    break
  }
  case 'build': {
    isDebug = false
    main = series(clean, parallel(series(parallel(css, js), html), copy))
    break
  }
}

if (main) {
  main((err) => {
    if (err) {
      process.exitCode = 1
      console.trace(err)
    }
  })
}
