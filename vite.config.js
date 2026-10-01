import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Keep logo variants as cacheable files instead of base64 copies inside every <img srcset>.
    assetsInlineLimit: 0,
  },
});
