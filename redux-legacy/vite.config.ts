import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/reduxjs-toolkit/legacy/',
  server: {
    port: 3001,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
});
