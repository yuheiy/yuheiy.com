const renderHelper = require('real-world-website-render-helper')
const browserSync = require('browser-sync').create()
const gulp = require('gulp')

const isProd = process.argv[2] === 'build'

const blogPosts = new Promise((resolve, reject) => {
    const request = require('request')
    const cheerio = require('cheerio')

    request('http://yuheiy.hatenablog.com/feed', (err, _res, body) => {
        if (err) {
            return reject(err)
        }

        const $ = cheerio.load(body, { xmlMode: true })
        const posts = $('entry').map((_i, el) => {
            const title = $('title', el).text()
            const url = $('link', el).attr('href')
            return { title, url }
        })

        resolve(posts)
    })
})

const renderHelperConfig = {
    input: 'src/html',
    inputExt: 'pug',
    output: 'dist',
    outputExt: 'html',
    task: async (pathname) => {
        const pug = require('pug')
        const locals = { blogPosts: await blogPosts }
        return pug.renderFile(pathname, locals)
    },
}

const css = () => {
    const gulpif = require('gulp-if')
    const sourcemaps = require('gulp-sourcemaps')
    const sass = require('gulp-sass')
    const postcss = require('gulp-postcss')
    const autoprefixer = require('autoprefixer')
    const csswring = require('csswring')

    return gulp
        .src('src/css/main.scss')
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(
            postcss([
                autoprefixer({
                    cascade: false,
                }),
                ...(isProd ? [csswring()] : []),
            ]),
        )
        .pipe(gulpif(!isProd, sourcemaps.write()))
        .pipe(gulp.dest('src/html'))
}

const js = () => {
    const { rollup } = require('rollup')
    const configs = require('./rollup.config')

    return Promise.all(
        configs.map(async ([inputConfig, outputConfig]) => {
            const { write } = await rollup(inputConfig)
            return write(outputConfig)
        }),
    ).catch((err) => {
        console.log(err)
    })
}

const serve = (done) => {
    browserSync.init(
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
    const del = require('del')
    return del('dist')
}

const watch = (done) => {
    gulp.watch('src/css/**/*.scss', css)
    gulp.watch('src/js/**/*.js', js)
    gulp.watch(['src/html/**/*', 'public/**/*']).on('all', browserSync.reload)
    done()
}

// prettier-ignore
gulp.task('default', gulp.series(
    clean,
    gulp.parallel(css, js),
    serve,
    watch,
))

const html = () => {
    return renderHelper.build(renderHelperConfig)
}

const copy = () => {
    return gulp.src('public/**/*').pipe(gulp.dest('dist'))
}

// prettier-ignore
gulp.task('build', gulp.series(
    clean,
    gulp.parallel(
        gulp.series(
            gulp.parallel(css, js),
            html,
        ),
        copy,
    ),
))
