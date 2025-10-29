import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Adicione esta opção se o problema persistir
      // Garante que o JSX runtime seja 'automatic'
      jsxRuntime: 'automatic', 
    }),
  ],
});