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

- create, update, close, or archive website-only listings;
- create website-only event listings when no Zeffy campaign exists;
- upload gallery photographs with captions and accessible descriptions;
- edit the heading and introductory copy on each primary page.

Each saved edit creates a Git commit and automatically rebuilds the site. No code editing is required for those tasks.

The class entries currently included in `src/data/classes/` are design-review sample content. Confirm or replace their dates, prices, instructors, and availability before the public launch.

## Services that still need one-time connection

1. **Public URL:** GitHub Actions reads the origin and base path from GitHub Pages settings. Navigation, assets, canonical/social URLs, and the generated `/admin/config.yml` follow that address automatically. Assign a custom domain only during the coordinated DNS cutover, then rerun **Deploy website**. No source edits or `CNAME` file are needed. See [`docs/DOMAIN_MIGRATION.md`](docs/DOMAIN_MIGRATION.md).
2. **Contact form:** Formspree is connected and delivery to the temporary CASA Gmail mailbox has been verified. Move delivery and fallback addresses to CASA's Google Workspace mailbox after the final domain is established.
3. **Editor login:** The Decap GitHub OAuth worker is connected. Before moving the editor to a new domain, add its exact HTTPS origin to the worker's `ALLOWED_SITE_ORIGINS`. Editor collections live in `src/config/admin.yml`; Astro generates the public configuration at build time.
4. **Zeffy:** The read-only API key is stored as the protected `ZEFFY_API_KEY` GitHub Actions secret. Campaign data is imported at build time and the deployment workflow refreshes automatically every four hours. Replace this secret when CASA moves from the test account to the treasurer-controlled account.

See [`docs/HANDOFF_CHECKLIST.md`](docs/HANDOFF_CHECKLIST.md) for the complete launch, ownership, domain, Workspace, and future members-area checklist.

No passwords, Gmail credentials, API keys, donor data, or payment details belong in this repository.

## Photography notes

- CASA studio photographs show CASA's actual Ames facilities.
- Mainframe Studios photographs are used only for the 25th-anniversary exhibition/history context and must not be presented as CASA's facility.
- Source photography supplied for this project is licensed for CASA's website use. Uploaded replacement images should be cleared for publication before they are added.
