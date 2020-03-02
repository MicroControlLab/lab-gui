/* tslint:disable:object-literal-sort-keys */
/* tslint:disable:no-implicit-dependencies */
/* tslint:disable:object-literal-key-quotes */
import camelCase from 'lodash.camelcase'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

const libraryName = 'lab-gui'

const outGlobals = {
  react: 'React',
  'react-dom': 'ReactDom',
  classnames: 'classnames',
  redux: 'redux',
  'react-redux': 'reactRedux',
  'prop-types': 'propTypes'
}

export default {
  input: `src/index.ts`,
  output: [
    {
      file: pkg.main,
      name: camelCase(libraryName),
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
      globals: outGlobals
    },
    { file: pkg.module, format: 'es', sourcemap: true, exports: 'named', globals: outGlobals }
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [
    'react',
    'react-dom',
    'prop-types',
    'classnames',
    'redux',
    'react-redux',
    'react-intl',
    'message-common',
    'bootstrap-styled-motion'
  ],
  watch: {
    include: 'src/**'
  },
  plugins: [
    external(),
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ tsconfig: 'tsconfig.json' }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      include: ['node_modules/**'],
      exclude: ['node_modules/process-es6/**'],
      namedExports: {
        'node_modules/react/index.js': [
          'Children',
          'Component',
          'PureComponent',
          'PropTypes',
          'createElement',
          'Fragment',
          'cloneElement',
          'StrictMode',
          'createFactory',
          'createRef',
          'createContext',
          'isValidElement',
          'isValidElementType'
        ],
        'node_modules/react-dom/index.js': ['render', 'hydrate'],
        'node_modules/react-redux/dist/react-redux.js': [
          'Provider',
          'createProvider',
          'connectAdvanced',
          'connect'
        ],
        'node_modules/react-is/index.js': ['isValidElementType', 'ForwardRef']
      }
    }),
    // Resolve source maps to the original source
    sourceMaps()
  ]
}
