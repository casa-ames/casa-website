# Domain and path configuration

## Current state

Completed October 31, 2026 and reconfirmed November 1, 2026: the public site is live at `https://www.creativeartistsames.org/` with HTTPS enabled. The GitHub Pages custom domain is assigned, Namecheap DNS points to GitHub Pages, the domain-aware deployment changes from PR #18 are merged, and the Cloudflare OAuth worker accepts the new editor origin.

The completed implementation works as follows:

- The deployment workflow reads `origin` and `base_path` from `actions/configure-pages`, keeping the existing project path until Pages settings change.
- Astro uses those values for navigation, assets, canonical URLs, and social previews. Local development defaults to `http://localhost:4321/`.
- `src/config/admin.yml` is the editor configuration template. The static endpoint `src/pages/admin/config.yml.ts` generates `/admin/config.yml` with the same hostname, site/display URLs, logo path, and image-preparation links as the rest of the site. The editor's public URL and content collections are unchanged.
- Content stores images as `/images/...`, independent of the publishing path. `publicAsset()` adds the current base path when rendering them. External links, repository identity, and the OAuth worker's service address stay explicit because they identify separate services.

No folders were renamed and no `public/CNAME` file is needed. GitHub Pages settings are the source of truth for the current origin and base path.

## Completed cutover record

CASA selected `www.creativeartistsames.org` as the primary address. The cutover used this sequence:

1. Merge the domain-aware build changes while Pages still uses the project URL and confirm **Deploy website** succeeds.
2. Add `https://www.creativeartistsames.org` to the Cloudflare OAuth worker's explicit `ALLOWED_SITE_ORIGINS` list; never replace the list with a wildcard.
3. Set **casa-ames/casa-website → Settings → Pages → Custom domain** to `www.creativeartistsames.org`.
4. In Namecheap, point `www` to `casa-ames.github.io` and retain the four GitHub Pages apex records. Preserve verification TXT, MX, SPF, DKIM, DMARC, and unrelated records.

   | Type | Host | Value | TTL |
   | --- | --- | --- | --- |
   | A | `@` | `185.199.108.153` | Automatic |
   | A | `@` | `185.199.109.153` | Automatic |
   | A | `@` | `185.199.110.153` | Automatic |
   | A | `@` | `185.199.111.153` | Automatic |
   | CNAME | `www` | `casa-ames.github.io` | Automatic |

5. Rerun **Actions → Deploy website → Run workflow** on `main` so Astro reads the new origin and `/` base path from Pages settings.
6. Confirm GitHub's DNS check, certificate, and **Enforce HTTPS**, then verify the public site and editor URLs.
7. Update staff bookmarks and handoff documentation to the custom-domain URLs.

GitHub normally redirects the old project URL after a custom domain is assigned; do not treat it as an independent copy. If the custom domain must be removed, clear the repository's Pages custom-domain assignment and rerun **Deploy website** to restore the project URL and base path. Keep any needed rollback origin in Cloudflare until rollback testing is complete.

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
