// vite.config.ts
import { defineConfig } from "file:///D:/PHUOC/work/brunei/mascot/fe_mascot/node_modules/vite/dist/node/index.js";
import react from "file:///D:/PHUOC/work/brunei/mascot/fe_mascot/node_modules/@vitejs/plugin-react-swc/index.mjs";
import MillionLint from "file:///D:/PHUOC/work/brunei/mascot/fe_mascot/node_modules/@million/lint/dist/compiler/index.mjs";
var vite_config_default = defineConfig(({ mode }) => {
  return {
    plugins: [react(), MillionLint.vite()],
    base: "/",
    build: {
      outDir: "build"
      // Ensure this is set to your desired output directory
    },
    server: {
      port: 3e3
      // Default port for development
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQSFVPQ1xcXFx3b3JrXFxcXGJydW5laVxcXFxtYXNjb3RcXFxcZmVfbWFzY290XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxQSFVPQ1xcXFx3b3JrXFxcXGJydW5laVxcXFxtYXNjb3RcXFxcZmVfbWFzY290XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9QSFVPQy93b3JrL2JydW5laS9tYXNjb3QvZmVfbWFzY290L3ZpdGUuY29uZmlnLnRzXCI7ICBpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuICBpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcclxuICBpbXBvcnQgTWlsbGlvbkxpbnQgZnJvbSBcIkBtaWxsaW9uL2xpbnRcIjtcclxuXHJcbiAgLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuICBleHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBwbHVnaW5zOiBbcmVhY3QoKSwgTWlsbGlvbkxpbnQudml0ZSgpXSxcclxuICAgICAgYmFzZTogJy8nLFxyXG4gICAgICBidWlsZDoge1xyXG4gICAgICAgIG91dERpcjogJ2J1aWxkJywgLy8gRW5zdXJlIHRoaXMgaXMgc2V0IHRvIHlvdXIgZGVzaXJlZCBvdXRwdXQgZGlyZWN0b3J5XHJcbiAgICAgIH0sXHJcbiAgICAgIHNlcnZlcjoge1xyXG4gICAgICAgIHBvcnQ6IDMwMDAsIC8vIERlZmF1bHQgcG9ydCBmb3IgZGV2ZWxvcG1lbnRcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgfSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1MsU0FBUyxvQkFBb0I7QUFDMVUsT0FBTyxXQUFXO0FBQ2xCLE9BQU8saUJBQWlCO0FBR3hCLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFNBQU87QUFBQSxJQUNMLFNBQVMsQ0FBQyxNQUFNLEdBQUcsWUFBWSxLQUFLLENBQUM7QUFBQSxJQUNyQyxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUE7QUFBQSxJQUNWO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUE7QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
