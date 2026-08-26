const TOKEN_HOST = 'https://github.com';
const STATE_MAX_AGE_MS = 10 * 60 * 1000;
const CURRENT_SITE_ORIGIN = 'https://casa-ames.github.io';

function securityHeaders(contentType = 'text/plain; charset=utf-8') {
  return {
    'Content-Type': contentType,
    'Cache-Control': 'no-store',
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  };
}

function encodeBase64Url(value) {
  const bytes = typeof value === 'string' ? new TextEncoder().encode(value) : value;
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

function decodeBase64Url(value) {
  const base64 = value.replaceAll('-', '+').replaceAll('_', '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  const binary = atob(base64);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function timingSafeEqual(left, right) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left[index] ^ right[index];
  return difference === 0;
}

async function signState(payload, secret) {
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(encodedPayload));
  return `${encodedPayload}.${encodeBase64Url(new Uint8Array(signature))}`;
}

async function verifyState(state, secret) {
  const [encodedPayload, encodedSignature] = state.split('.');
  if (!encodedPayload || !encodedSignature) return null;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const expected = new Uint8Array(
    await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(encodedPayload)),
  );
  const supplied = decodeBase64Url(encodedSignature);
  if (!timingSafeEqual(expected, supplied)) return null;

  try {
    const payload = JSON.parse(new TextDecoder().decode(decodeBase64Url(encodedPayload)));
    if (!payload.origin || !payload.createdAt || Date.now() - payload.createdAt > STATE_MAX_AGE_MS) return null;
    return payload;
  } catch {
    return null;
  }
}

function allowedOrigins(env) {
  return (env.ALLOWED_SITE_ORIGINS || CURRENT_SITE_ORIGIN)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function resolveSiteOrigin(url, env) {
  const siteId = url.searchParams.get('site_id');
  return allowedOrigins(env).find((origin) => {
    try {
      return new URL(origin).hostname === siteId;
    } catch {
      return false;
    }
  });
}

async function handleAuth(url, env) {
  if (url.searchParams.get('provider') !== 'github') {
    return new Response('Invalid provider.', { status: 400, headers: securityHeaders() });
  }

  const siteOrigin = resolveSiteOrigin(url, env);
  if (!siteOrigin) {
    return new Response('This site is not authorized to use the CASA editor.', {
      status: 403,
      headers: securityHeaders(),
    });
  }

  const state = await signState(
    {
      origin: siteOrigin,
      createdAt: Date.now(),
      nonce: crypto.randomUUID(),
    },
    env.GITHUB_OAUTH_SECRET,
  );
  const redirectUri = `${url.origin}/callback`;
  const scope = env.GITHUB_REPO_PRIVATE === '1' ? 'repo,user' : 'public_repo,user';
  const authorizationUrl = new URL('/login/oauth/authorize', TOKEN_HOST);
  authorizationUrl.search = new URLSearchParams({
    client_id: env.GITHUB_OAUTH_ID,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope,
    state,
  }).toString();

  return Response.redirect(authorizationUrl.toString(), 302);
}

async function exchangeCode(code, redirectUri, env) {
  const response = await fetch(`${TOKEN_HOST}/login/oauth/access_token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'CASA-Decap-OAuth',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_OAUTH_ID,
      client_secret: env.GITHUB_OAUTH_SECRET,
      code,
      redirect_uri: redirectUri,
    }),
  });
  const result = await response.json();
  if (!response.ok || !result.access_token) {
    throw new Error(result.error_description || result.error || 'GitHub did not return an access token.');
  }
  return result.access_token;
}

function callbackPage(token, targetOrigin) {
  const payload = JSON.stringify({ token });
  const script = `
    const targetOrigin = ${JSON.stringify(targetOrigin)};
    const receiveMessage = (event) => {
      if (event.origin !== targetOrigin) return;
      window.opener.postMessage('authorization:github:success:' + ${JSON.stringify(payload)}, targetOrigin);
      window.removeEventListener('message', receiveMessage);
    };
    window.addEventListener('message', receiveMessage);
    window.opener.postMessage('authorizing:github', targetOrigin);
  `;
  const html = `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Authorizing CASA editor</title></head>
  <body><p>Authorizing the CASA website editor…</p><script>${script}</script></body>
</html>`;
  return new Response(html, {
    headers: {
      ...securityHeaders('text/html; charset=utf-8'),
      'Content-Security-Policy': "default-src 'none'; script-src 'unsafe-inline'; style-src 'none'; frame-ancestors 'none'",
    },
  });
}

async function handleCallback(url, env) {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  if (!code || !state) {
    return new Response('The GitHub authorization response is incomplete.', {
      status: 400,
      headers: securityHeaders(),
    });
  }

  const payload = await verifyState(state, env.GITHUB_OAUTH_SECRET);
  if (!payload || !allowedOrigins(env).includes(payload.origin)) {
    return new Response('The GitHub authorization state is invalid or expired.', {
      status: 403,
      headers: securityHeaders(),
    });
  }

  try {
    const token = await exchangeCode(code, `${url.origin}/callback`, env);
    return callbackPage(token, payload.origin);
  } catch {
    return new Response('GitHub authorization could not be completed. Please close this window and try again.', {
      status: 502,
      headers: securityHeaders(),
    });
  }
}

export default {
  async fetch(request, env) {
    if (!env.GITHUB_OAUTH_ID || !env.GITHUB_OAUTH_SECRET) {
      return new Response('OAuth secrets are not configured.', { status: 503, headers: securityHeaders() });
    }

    const url = new URL(request.url);
    if (request.method !== 'GET') {
      return new Response('Method not allowed.', { status: 405, headers: securityHeaders() });
    }
    if (url.pathname === '/auth') return handleAuth(url, env);
    if (url.pathname === '/callback') return handleCallback(url, env);
    if (url.pathname === '/') {
      return new Response('CASA Decap OAuth proxy is running.', { headers: securityHeaders() });
    }
    return new Response('Not found.', { status: 404, headers: securityHeaders() });
  },
};
