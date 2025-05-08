import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Cho phép truy cập từ bên ngoài
    port: 8082, // Port chạy trên Droplet
    strictPort: true, // Không tự động thay đổi port nếu bị chiếm
    watch: {
      usePolling: true, // Fix hot reload khi chạy trên Docker hoặc Droplet
    },
    proxy: {
      "/socket.io": {
        target: "http://huytran3.workspace.opstech.org:8080",
        ws: true,
        changeOrigin: true, // Thay đổi origin header
      },
    },
    hmr: {
      host: "http://huytran3.workspace.opstech.org/", // Thay bằng IP của Droplet
      port: 8082,
    },
  },
});
