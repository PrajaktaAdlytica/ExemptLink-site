import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
export default defineConfig({
  plugins:[react(),tailwindcss()],
  define:{'process.env.NODE_ENV':JSON.stringify('production')},
  resolve:{alias:{'@':fileURLToPath(new URL('.',import.meta.url))}},
  build:{outDir:'dist/assets/interactive',emptyOutDir:false,cssCodeSplit:false,
    lib:{entry:fileURLToPath(new URL('./src/backgrounds.tsx',import.meta.url)),formats:['es'],fileName:()=> 'jade-sky.js',cssFileName:'jade-sky'},
    sourcemap:false,minify:true}
})
