import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        construction: resolve(__dirname, 'construction.html'),
        realestate: resolve(__dirname, 'realestate.html'),
        engineering: resolve(__dirname, 'engineering.html'),
        management: resolve(__dirname, 'management.html'),
        architecture: resolve(__dirname, 'architecture.html'),
        interior: resolve(__dirname, 'interior.html'),
      },
      output: {
        manualChunks: {
          motion: ['framer-motion'],
          gsap: ['gsap', '@gsap/react', 'lenis'],
          react: ['react', 'react-dom'],
        },
      },
    },
  },
});
