# CASA website handoff checklist

This is the durable checklist for preparing the website for CASA ownership and routine staff use. Update it as accounts, content, and services are finalized.

## Completed

- [x] CASA GitHub organization and public website repository created.
- [x] GitHub Pages deployment configured and verified.
- [x] Responsive first-draft website published at `https://casa-ames.github.io/casa-website/`.
- [x] Formspree contact endpoint connected and a real mailbox delivery test completed.
- [x] Decap CMS editor interface and content models scaffolded at `/admin/`.
- [x] Decap GitHub OAuth Worker deployed and `/admin/` authentication connected.
- [x] Editor login tested with an authorized CASA GitHub account.
- [x] Editorial workflow tested from draft through review, ready, and publication.
- [x] Sample class created, edited, archived as a past offering, and published through the editor.
- [x] Class image upload and accessible image description tested through the editor.
- [x] Closed Zeffy test campaign created and linked to the hidden sample class.
- [x] Gallery image upload, caption, accessible description, editorial workflow, and public rendering tested.
- [x] External gallery links made editable through the CMS and seeded with the CASA 25th Anniversary photobook.

## Before CASA review

- [ ] Add real Zeffy registration URLs when CASA supplies or creates them.
- [ ] Confirm or replace all sample class titles, dates, instructors, prices, locations, and availability.
- [x] Confirm CASA's street address and Facebook and Instagram links.
- [ ] Confirm CASA's public email address, phone number when available, and hours.
- [ ] Review all copy and selected photographs with CASA.

## Domain and Google Workspace migration

- [ ] Confirm and purchase CASA's final domain; double-check the exact spelling before purchase.
- [ ] Configure the domain for the public website and decide whether a separate `members` subdomain will be used later.
- [ ] Create CASA Google Workspace users, aliases, or Groups for public inquiries.
- [ ] Replace Formspree delivery to `admincasa0@gmail.com` with the appropriate CASA Google Workspace address or routing group.
- [ ] Update every visible `mailto:` address and administrative fallback address to the CASA Workspace address.
- [ ] Verify Formspree delivery, reply-to behavior, and category routing after the mailbox change.
- [ ] Configure and verify Workspace SPF, DKIM, and DMARC records.
- [ ] Update the website canonical URL, social-preview URL, CMS `site_url`, CMS `display_url`, media paths, GitHub Pages custom-domain setting, and repository metadata.
- [ ] Retest all navigation, images, forms, editor login, and Zeffy links on the custom domain.

## Access, security, and ownership

- [ ] Add at least two CASA-controlled GitHub organization owners and require two-factor authentication.
- [ ] Give each website editor an individual GitHub account with only the access they need; do not share credentials.
- [ ] Add at least two CASA-controlled Cloudflare administrators and enable two-factor authentication.
- [ ] Record ownership and recovery details for GitHub, Cloudflare, Formspree, Zeffy, the domain registrar, and Google Workspace in CASA's password manager.
- [ ] Keep OAuth secrets and service credentials out of this repository and out of handoff documents.
- [ ] Review Formspree spam controls, notification rules, submission retention, and data-export settings.

## Content and operations

- [ ] Establish who at CASA owns class updates, gallery updates, inquiries, and account administration.
- [x] Write a staff guide for Zeffy events, class publishing, gallery management, external links, images, and archiving.
- [x] Set a provisional image-size and accessible-description standard for future uploads.
- [ ] Decide how frequently old classes, gallery items, and Formspree submissions should be archived or removed.
- [ ] Conduct a final accessibility, keyboard, mobile, performance, metadata, and broken-link review.

## Future members area

- [ ] Define what information and tools belong in the private members area.
- [ ] Select authenticated hosting and a user-management system for the members subdomain.
- [ ] Keep member data and private application code separate from the public GitHub Pages repository.
- [ ] Define account creation, removal, password recovery, privacy, and data-retention procedures before launch.
