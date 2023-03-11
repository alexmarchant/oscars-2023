import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  optimizeDeps: {
    include: ['@am-oscar-2023/shared'],
  },
  build: {
    commonjsOptions: {
      include: [/@am-oscar-2023/, /node_modules/],
    },
  },
})
