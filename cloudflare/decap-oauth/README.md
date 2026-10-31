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

The website generates Decap's `site_domain` from the Pages hostname. This does not authorize a new origin in the worker: update the deployed Cloudflare variable explicitly, retaining the old origin through cutover. Keep `wrangler.toml` aligned too; `wrangler deploy --keep-vars` preserves remotely maintained variables rather than applying changed local variables. See [the migration checklist](../../docs/DOMAIN_MIGRATION.md). The worker callback URL stays unchanged when only the website domain changes.

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

