import { defineConfig } from 'astro/config';

const requestedBase = process.env.BASE_PATH || '/';
const base = requestedBase.endsWith('/') ? requestedBase : `${requestedBase}/`;

export default defineConfig({
  site: process.env.SITE_URL || 'https://casa-ames.org',
  base,
  output: 'static',
  build: {
    assets: '_assets',
  },
});
