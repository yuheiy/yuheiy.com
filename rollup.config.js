const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const uglify = require('rollup-plugin-uglify')
const { minify } = require('uglify-es')

const isProd = process.argv[2] === 'build'

const inputConfig = {
    input: './src/js/main.js',
    plugins: [
        resolve(),
        commonjs(),
        isProd &&
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
    ],
}

const defaultConfig = [
    inputConfig,
    {
        file: './src/html/main.js',
        format: 'es',
        sourcemap: !isProd && 'inline',
    },
]

const legacyConfig = [
    inputConfig,
    {
        file: './dist/nomodule.js',
        format: 'iife',
        sourcemap: !isProd && 'inline',
    },
]

module.exports = [defaultConfig, legacyConfig]
