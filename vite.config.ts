import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'index.ts'),
      formats: ['es', 'cjs'],
      fileName: (ext: string) => `index.${ext}.js`
    },
    target: 'esnext',
    sourcemap: true
  }
})
