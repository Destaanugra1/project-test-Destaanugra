import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), tailwindcss()],
    // Only use proxy in development mode
    server: {
      proxy: {
        '/api': {
          target: 'https://suitmedia-backend.suitdev.com',
          changeOrigin: true,
          secure: true,
        },
        '/assets': {
          target: 'https://assets.suitdev.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/assets/, ''),
        },
      },
    },
  };
});
