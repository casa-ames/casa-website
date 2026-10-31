# Domain and path configuration

## Current state and safe preparation

Checked October 31, 2026: the Pages API reports `https://casa-ames.github.io/casa-website/`, custom domain unset, GitHub Actions publishing, and HTTPS enforced. The existing public site responds successfully. The apex DNS has all four GitHub Pages IPv4 addresses; `www` still points to `admincasa0.github.io`. Domain ownership verification is separate from the repository's Pages custom-domain assignment.

These source changes can be merged before DNS is fixed:

- The deployment workflow reads `origin` and `base_path` from `actions/configure-pages`, keeping the existing project path until Pages settings change.
- Astro uses those values for navigation, assets, canonical URLs, and social previews. Local development defaults to `http://localhost:4321/`.
- `src/config/admin.yml` is the editor configuration template. The static endpoint `src/pages/admin/config.yml.ts` generates `/admin/config.yml` with the same hostname, site/display URLs, logo path, and image-preparation links as the rest of the site. The editor's public URL and content collections are unchanged.
- Content stores images as `/images/...`, independent of the publishing path. `publicAsset()` adds the current base path when rendering them. External links, repository identity, and the OAuth worker's service address stay explicit because they identify separate services.

No folders need renaming. Do not add `public/CNAME`, change the workflow to a fixed `/` base, or assign the custom domain early: doing so can move or redirect the existing Pages site before DNS is ready. GitHub Actions deployments do not require a `CNAME` file.

## Coordinated cutover with Lee Anne

Use one primary address. The example below uses `www.creativeartistsames.org`, matching the domain reported as verified in the planning conversation. If CASA chooses the bare domain instead, enter `creativeartistsames.org` in Pages and allow that origin in Cloudflare; GitHub redirects the other version when both DNS records are set.

1. Merge the preparation PR while Pages still uses the project URL. Confirm **Deploy website** succeeds and check the existing site and editor.
2. In Cloudflare, add `https://www.creativeartistsames.org` to the OAuth worker's comma-separated `ALLOWED_SITE_ORIGINS`, retaining `https://casa-ames.github.io` through the transition. Add the bare HTTPS origin too if the editor must authenticate there before a redirect. Record the same list in `cloudflare/decap-oauth/wrangler.toml` to keep the source aligned with the service. This is an explicit list of trusted origins; never use a wildcard. The current repo change does not deploy or change the worker.
3. When Lee Anne is ready to edit DNS, set **casa-ames/casa-website → Settings → Pages → Custom domain** to `www.creativeartistsames.org`. Save this immediately before updating DNS, following GitHub's recommended order. Ownership verification alone does not perform this step.
4. In Namecheap, change the `www` CNAME to `casa-ames.github.io`, without a protocol or `/casa-website/`. Keep the four apex A records below. Remove only conflicting parking/redirect or web records for these hosts. Preserve verification TXT, MX, SPF, DKIM, DMARC, and unrelated records.

   | Type | Host | Value | TTL |
   | --- | --- | --- | --- |
   | A | `@` | `185.199.108.153` | Automatic |
   | A | `@` | `185.199.109.153` | Automatic |
   | A | `@` | `185.199.110.153` | Automatic |
   | A | `@` | `185.199.111.153` | Automatic |
   | CNAME | `www` | `casa-ames.github.io` | Automatic |

5. Rerun **Actions → Deploy website → Run workflow** on `main`. Changing Pages settings alone does not immediately rebuild Astro. The next build reads the new origin and empty Pages base path, normalized to `/`. Avoid overlapping an old deployment with this change; rerun after it finishes if necessary.
6. Wait for GitHub's DNS check and certificate provisioning; enable/confirm **Enforce HTTPS** when available. DNS propagation can take up to 24 hours. Verify both bare and `www` addresses, the preferred redirect, navigation, images, social/canonical metadata, `/admin/config.yml`, and the image-preparation tool. Test a real editor login and a draft/image preview, contact-form delivery, and Zeffy links on the new domain. Do not publish test content merely to check login.
7. Update the staff guide's bookmarked addresses and repository About URL. Review Formspree domain restrictions if configured. Remove the old Cloudflare allowed origin only after it is no longer needed.

GitHub normally redirects the old project URL after a custom domain is assigned; do not expect it to remain an independent copy. The preparation preserves it before cutover. If cutover must be abandoned, remove the repository's custom-domain assignment and rerun **Deploy website** to restore the project URL and base path. Keep the old OAuth origin allowed until rollback is no longer needed.

## Future domain changes

The site source should need no domain replacement: update Pages settings and DNS, then rerun deployment. The build generates all site-owned addresses. The OAuth worker still requires an explicit trusted-origin update, and third-party domain restrictions and staff bookmarks still need review. Its GitHub OAuth callback stays at the worker's `/callback` URL unless the worker itself moves.

For another hosting platform, supply `SITE_URL` (origin, e.g. `https://www.example.org`) and `BASE_PATH` (`/` at a domain root) to the build environment. For local project-path testing:

```sh
SITE_URL=https://casa-ames.github.io BASE_PATH=/casa-website/ pnpm build
```

For custom-domain testing without changing DNS:

```sh
SITE_URL=https://www.creativeartistsames.org BASE_PATH=/ pnpm build
```

## References

- [GitHub: managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub configure-pages outputs](https://github.com/actions/configure-pages/blob/v5/action.yml)
- [Astro base-path configuration](https://docs.astro.build/en/reference/configuration-reference/#base)
