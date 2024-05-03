import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Puerto en el que servirá Vite
    proxy: {
      "/api": {
        target: "http://localhost:8000", // Puerto donde se encuentra el servidor que maneja las solicitudes API
       
      }
    }
  }
})
