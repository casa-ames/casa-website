import { defineConfig } from 'astro/config';

const requestedBase = process.env.BASE_PATH || '/';
const base = requestedBase.endsWith('/') ? requestedBase : `${requestedBase}/`;

export default defineConfig({
  // Production values come from GitHub Pages; local builds use the dev origin.
  site: process.env.SITE_URL || 'http://localhost:4321',
  base,
  output: 'static',
  build: {
    assets: '_assets',
  },
});
