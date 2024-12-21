  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import MillionLint from "@million/lint";

  // https://vitejs.dev/config/
  export default defineConfig(({ mode }) => {
    return {
      plugins: [react(), MillionLint.vite()],
      base: '/',
      build: {
        outDir: 'build', // Ensure this is set to your desired output directory
      },
      server: {
        port: 3000, // Default port for development
      },
    };
  });
