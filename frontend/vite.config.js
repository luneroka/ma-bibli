import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// import fs from 'fs';

// https://vitejs.dev/config/
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export default defineConfig(({ mode }) => {
  // Load env variables for the current mode
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const env = loadEnv(mode, __dirname);
  const API_URL = env.VITE_API_URL || 'http://backend:3000';
  return {
    plugins: [react(), tailwindcss()],
    server: {
      // https: {
      //   key: fs.readFileSync('key.pem'),
      //   cert: fs.readFileSync('cert.pem'),
      // },
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});

