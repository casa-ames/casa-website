# CASA Decap OAuth Worker

This Cloudflare Worker connects CASA's Decap CMS editor to GitHub. The source is safe to keep in the public website repository; its credentials are not.

## Cloudflare configuration

Worker name: `casa-decap-oauth`

Public URL: `https://casa-decap-oauth.admincasa0.workers.dev`

Encrypted Worker secrets:

- `GITHUB_OAUTH_ID`
- `GITHUB_OAUTH_SECRET`

Never put either value in this repository, a handoff document, an email, or a chat message. Set and rotate them through Cloudflare's Variables and Secrets controls.

The plaintext configuration in `wrangler.toml` restricts editor authentication to CASA's current public site. Add the final custom-domain origin to `ALLOWED_SITE_ORIGINS` during the domain migration, test it, and then remove the GitHub Pages origin if it is retired.

## Deployment

From this directory, using an authenticated Wrangler installation:

```sh
wrangler deploy --keep-vars
```

The `--keep-vars` option preserves values maintained through Cloudflare. Worker secrets are preserved by Cloudflare deployments, but should still be verified after any infrastructure change.

## GitHub OAuth application

- Homepage URL: `https://casa-decap-oauth.admincasa0.workers.dev`
- Callback URL: `https://casa-decap-oauth.admincasa0.workers.dev/callback`

The CASA GitHub organization should own the OAuth application. Authorized editors must also have the appropriate access to `casa-ames/casa-website`.

