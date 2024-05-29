import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const base = mode === 'development' ? '/' : '/zodiac-game/';

  return {
    plugins: [react()],
    base: base,
    server: {
      port: 3000, // Default port for development
    },
  };
});
