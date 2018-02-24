const renderHelper = require('real-world-website-render-helper')
const browserSync = require('browser-sync').create()
const gulp = require('gulp')

const isProd = process.argv[2] === 'build'

let blogPosts = null

const loadBlogPosts = async () => {
    const { JSDOM } = require('jsdom')

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
        const pug = require('pug')
        return pug.render(src.toString(), {
            blogPosts,
            filename,
            basedir: 'src/html',
        })
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
    const options = {
        delay: 50,
    }

    const reload = (done) => {
        browserSync.reload()
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
