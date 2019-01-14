
import postcss from 'rollup-plugin-postcss';
import vue from 'rollup-plugin-vue';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
// import { uglify } from 'rollup-plugin-uglify';

const production = !process.env.ROLLUP_WATCH;

const plugins = [
  postcss({ extract: true }),
  vue({ css: false }),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  resolve(),
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true,
  }),
  commonjs(),
];

const config = {
  input: 'src/index.js',
  output: {
    file: 'dist/assets/bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins,
};

if (production) {
  config.output.sourcemap = false;
  // config.plugins.push(uglify());
}

export default config;
