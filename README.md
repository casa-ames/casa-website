# CASA website

Website for Creative Artists' Studios of Ames (CASA), built with Astro and designed around an open-studio editorial system: white space, true black, CASA red, light gray, and original CASA photography.

## Local development

```sh
pnpm install
pnpm dev
```

Run `pnpm check` and `pnpm build` before publishing.

## Everyday editing

Once Decap CMS authentication is connected, CASA staff can visit `/admin/`, sign in with their authorized GitHub account, and:

- create, update, close, or archive classes;
- paste a Zeffy registration link into a class;
- upload gallery photographs with captions and accessible descriptions;
- edit the heading and introductory copy on each primary page.

Each saved edit creates a Git commit and automatically rebuilds the site. No code editing is required for those tasks.

The class entries currently included in `src/data/classes/` are design-review sample content. Confirm or replace their dates, prices, instructors, and availability before the public launch.

## Services that still need one-time connection

1. **Public URL:** Set `site` and `base` through the `SITE_URL` and `BASE_PATH` environment variables, or update the fallbacks in `astro.config.mjs` after the final domain is chosen.
2. **Contact form:** In the CASA Google account, create an Apps Script project, paste in `google-apps-script/Code.gs`, deploy it as a web app that runs as the owner and is available to anyone, then put its `/exec` URL into `src/config/site.ts`.
3. **Editor login:** Deploy a small Decap GitHub OAuth worker, authorize only the `casa-ames/casa-website` repository, and replace `REPLACE_WITH_DECAP_OAUTH_WORKER` in `public/admin/config.yml`.
4. **Zeffy:** Paste each live Zeffy event URL into the class's “Zeffy registration link” field in the editor.
5. **GitHub Pages:** In repository settings, set Pages source to “GitHub Actions.” If the organization’s GitHub plan does not allow Pages from a private repository, keep the repository private and connect the same repository to Cloudflare Pages or Netlify instead.

No passwords, Gmail credentials, API keys, donor data, or payment details belong in this repository.

## Photography notes

- CASA studio photographs show CASA's actual Ames facilities.
- Mainframe Studios photographs are used only for the 25th-anniversary exhibition/history context and must not be presented as CASA's facility.
- Source photography supplied for this project is licensed for CASA's website use. Uploaded replacement images should be cleared for publication before they are added.
