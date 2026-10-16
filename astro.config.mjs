import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  devToolbar: { enabled: false },
  trailingSlash: 'never',
  integrations: [svelte()],
  vite: { plugins: [tailwindcss()] },
  image: { layout: 'constrained' },
});
