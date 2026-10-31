import type { APIRoute } from 'astro';
import template from '../../config/admin.yml?raw';

// Emit a static config at the same URL Decap already requests. Use the same
// deployment address as navigation, assets, canonical URLs, and social previews.
export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('The editor requires an Astro site URL.');
  const base = import.meta.env.BASE_URL;
  const values: Record<string, string> = {
    SITE_HOST: JSON.stringify(site.hostname),
    SITE_URL: JSON.stringify(new URL(base, site).href.replace(/\/$/, '')),
    LOGO_URL: JSON.stringify(`${base}images/casa-logo-source.jpg`),
    IMAGE_PREP_PATH: `${base}image-prep/`,
  };
  const config = template.replace(/__([A-Z_]+)__/g, (_, name: string) => {
    if (!(name in values)) throw new Error(`Unknown editor config placeholder: ${name}`);
    return values[name];
  });
  return new Response(config, { headers: { 'Content-Type': 'text/yaml; charset=utf-8' } });
};
