import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),eslint()],
   server: {
    mimeTypes: {
      '.jsx': 'application/javascript',
    },
    proxy: {
            "/api": {
                target: "https://worldwise-backend-iota.vercel.app",
                changeOrigin: true,
                secure: true,
            },
        },
  },
})
