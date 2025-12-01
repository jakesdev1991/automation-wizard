import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      $components: 'src/components',
      $lib: 'src/lib',
      $nodes: 'src/nodes'
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  }
});
