import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
import css from 'rollup-plugin-css-only';
import gzipPlugin from 'rollup-plugin-gzip';
import livereload from 'rollup-plugin-livereload';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

const jsPath = 'public/build/bundle.js'
const cssPath = 'public/build/bundle.css'

if (!production && fs.existsSync(`${jsPath}.gz`)) {
  fs.unlink(`${jsPath}.gz`, function(err){
    if(err){
      // throw err;
    }
    console.log(`文件:${jsPath}.gz删除成功！`);
  })

  fs.unlink(`${cssPath}.gz`, function(err){
    if(err){
      // throw err;
    }
    console.log(`文件:${cssPath}.gz删除成功！`);
  })
}

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    }
  };
}

export default {
  input: 'src/main.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: jsPath
  },
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production
      }
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: 'bundle.css' }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    typescript({
      sourceMap: !production,
      inlineSources: !production
    }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
    production && gzipPlugin()
  ],
  watch: {
    clearScreen: false
  }
};
