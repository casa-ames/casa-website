export function publicAsset(path: string) {
  if (/^https?:\/\//i.test(path)) return path;

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalized = `/${path.replace(/^\/+/, '')}`;

  if (!base || base === '/' || normalized === base || normalized.startsWith(`${base}/`)) {
    return normalized;
  }

  return `${base}${normalized}`;
}
