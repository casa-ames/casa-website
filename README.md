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
2. **Contact form:** Formspree is connected and delivery to the temporary CASA Gmail mailbox has been verified. Move delivery and fallback addresses to CASA's Google Workspace mailbox after the final domain is established.
3. **Editor login:** Deploy a small Decap GitHub OAuth worker, authorize the `casa-ames/casa-website` repository, and replace `REPLACE_WITH_DECAP_OAUTH_WORKER` in `public/admin/config.yml`.
4. **Zeffy:** Paste each live Zeffy event URL into the class's “Zeffy registration link” field in the editor.

See [`docs/HANDOFF_CHECKLIST.md`](docs/HANDOFF_CHECKLIST.md) for the complete launch, ownership, domain, Workspace, and future members-area checklist.

No passwords, Gmail credentials, API keys, donor data, or payment details belong in this repository.

## Photography notes

- CASA studio photographs show CASA's actual Ames facilities.
- Mainframe Studios photographs are used only for the 25th-anniversary exhibition/history context and must not be presented as CASA's facility.
- Source photography supplied for this project is licensed for CASA's website use. Uploaded replacement images should be cleared for publication before they are added.
