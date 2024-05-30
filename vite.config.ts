// vite.config.js
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import copyPackageJsonPlugin from './plugin/copyPackageJson'

export default defineConfig({
  plugins: [dts({ rollupTypes: true }), copyPackageJsonPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Recorder',
      fileName: 'recorder',
      formats: ['es', 'cjs', 'umd', 'iife']
    }
  },
})
