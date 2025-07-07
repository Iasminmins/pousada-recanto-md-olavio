import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carregar variáveis de ambiente
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      host: "::",
      port: 8080,
      // ADICIONADO: Proxy para resolver CORS
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '/api')
        }
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
    // ADICIONADO: Definir process.env e global para compatibilidade
    define: {
      // Disponibilizar process.env no navegador
      'process.env': JSON.stringify(env),
      // Definir global
      global: 'globalThis',
    },
    // ADICIONADO: Build settings
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
  };
});