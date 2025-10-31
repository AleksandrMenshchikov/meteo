import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@/public': path.resolve(__dirname, 'public'),
      '@/src': path.resolve(__dirname, 'src'),
    },
  },
  base: path.resolve(__dirname, './dist'),
});
