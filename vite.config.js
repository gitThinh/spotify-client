import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    html({
      inject: {
        injectTo: 'head',
        html: {
          transform: (html) => html.replace(/\/assets\//g, './assets/'),
        },
      },
    }),
    react()
  ],
})


