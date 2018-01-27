const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const uglify = require('rollup-plugin-uglify')

const isProd = process.argv[2] === 'build'

const inputConfig = {
    input: './src/js/main.js',
    plugins: [
        resolve(),
        commonjs(),
        isProd &&
            uglify({
                output: {
                    comments: (_, { value, type }) => {
                        if (type === 'comment2') {
                            // multiline comment
                            return /@preserve|@license|@cc_on/i.test(value)
                        }
                    },
                },
            }),
    ],
}

const moduleConfig = [
    inputConfig,
    {
        file: './src/html/main.js',
        format: 'es',
        sourcemap: !isProd && 'inline',
    },
]

const nomoduleConfig = [
    inputConfig,
    {
        file: './dist/nomodule.js',
        format: 'iife',
        sourcemap: !isProd && 'inline',
    },
]

module.exports = [moduleConfig, nomoduleConfig]