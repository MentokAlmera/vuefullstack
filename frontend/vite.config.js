import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  server: {
    host: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      // '/user_comment': {
      //   target: 'http://localhost:5000',
      //   changeOrigin: true,
      //   secure: false
      // }
    }
  },
  optimizeDeps: {
    include: ['axios']
  }
}); 