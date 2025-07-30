import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8081,
    headers: {
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
        "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com",
        "img-src 'self' data: https: blob:",
        "connect-src 'self' https://api.supabase.io https://*.supabase.co https://fonts.googleapis.com",
        "object-src 'none'",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'"
      ].join('; ')
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // 防止 framer-motion 使用 eval
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
  build: {
    // 優化構建以避免 eval 使用
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
    rollupOptions: {
      external: [],
      output: {
        // 確保 framer-motion 正確處理
        manualChunks: {
          'framer-motion': ['framer-motion'],
        },
      },
    },
  },
  optimizeDeps: {
    // 預構建 framer-motion 以避免運行時 eval
    include: ['framer-motion'],
    esbuildOptions: {
      // 確保 ESBuild 不使用 eval
      target: 'es2015',
    },
  },
}));
