import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, './src/assets'),
      "@components": path.resolve(__dirname, './src/components'),
      "@eCommerce": path.resolve(__dirname, './src/components/eCommerce'),
      "@hooks": path.resolve(__dirname, './src/hooks'),
      "@pages": path.resolve(__dirname, './src/pages'),
      "@routes": path.resolve(__dirname, './src/routes'),
      "@store": path.resolve(__dirname, './src/store'),
      "@styles": path.resolve(__dirname, './src/styles'),
      "@layouts": path.resolve(__dirname, './src/layouts'),
      "@utils": path.resolve(__dirname, './src/utils'),
      "@services": path.resolve(__dirname, './src/services'),
      "@inerfaces": path.resolve(__dirname, './src/inerfaces'),
      "@validations": path.resolve(__dirname, './src/validations'),
    }
  },
  plugins: [react(), svgr(),],
  server:{
    port: 1999
  }
})
