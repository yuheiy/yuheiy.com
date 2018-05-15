const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const uglify = require('rollup-plugin-uglify')

const isProd = process.argv[2] === '--prod'

module.exports = [
  {
    input: './src/js/main.mjs',
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
  },
  {
    file: './src/html/main.mjs',
    format: 'es',
    sourcemap: !isProd && 'inline',
  },
]
