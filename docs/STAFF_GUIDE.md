# CASA website staff guide

This guide covers routine content updates. It does not require coding.

## Sign in

1. Open `https://casa-ames.github.io/casa-website/admin/` in a regular web browser.
2. Choose **Login with GitHub** and authorize the CASA Website Editor.
3. Sign in with your own GitHub account. CASA should never share one account or password among staff.

Your GitHub account must have access to the `casa-ames/casa-website` repository. Ask a CASA GitHub organization owner if the editor does not open.

## Add a class

Every class must be entered in two places:

- **Zeffy** manages registration, tickets, capacity, attendee information and proceeds.
- **The CASA website editor** creates the class listing that visitors see on the CASA website.

Some information—including the title, dates, time, location, price and description—must be entered twice, once on each platform. These details must agree before the class is published.

### 1. Create the event in Zeffy

1. Sign in to CASA’s Zeffy account.
2. Open **Campaigns**, choose **+ New campaign**, and select **Event**.
3. Enter the class title, date or dates, start and end times, and CASA’s address.
4. Add the description, an authorized image and CASA branding.
5. Create the ticket or registration type, including its price and available quantity. For a free class, enter a ticket price of `0` rather than leaving the price blank.
6. Add only the attendee questions CASA genuinely needs.
7. Review the confirmation message, reminder settings, sales closing time, cancellation information and any additional-donation option.
8. Preview the event on both desktop and mobile, then complete the builder until Zeffy shows the confirmation that the campaign has been created.
9. Return to **Campaigns**, open the three-dot menu beside the event, choose **Share**, and select **Copy link**. Copy the public campaign link, not a dashboard or edit URL.

For the current Zeffy interface, see [Configuring an Event Campaign](https://support.zeffy.com/configuring-an-event-campaign-on-zeffy-rd9ar) and [How to Find Your Campaign’s Share Link](https://support.zeffy.com/how-to-find-your-campaigns-share-link-p6cug).

### 2. Create the class listing in the CASA website editor

1. Open **Classes** and choose **New Class**.
2. Enter the class information. The display date is the short label visitors see, while the start and end dates control chronological ordering.
3. Upload one landscape-oriented image and write an image description that explains what is visibly happening.
4. Choose the correct status:
   - **Open** shows the registration action when a Zeffy link is present.
   - **Registration coming soon** announces the offering without opening sales.
   - **Sold out** or **Cancelled** clearly closes registration.
   - **Past** removes the class from current public listings while keeping its record in the editor.
5. Turn on **Show on homepage** only for a small number of current priority offerings.
6. Paste the public Zeffy campaign link into **Zeffy registration link**.
7. Save the entry and move it through the editorial workflow (**Draft → In Review → Ready → Published**).

After publication, open the public class listing and test its registration button. Confirm that the Zeffy page has the same title, dates, times, price, capacity, location and availability.

## Review and publish

CASA uses an editorial workflow (**Draft → In Review → Ready → Published**) so incomplete changes do not immediately reach the public website.

1. Keep work in **Draft** while details are incomplete.
2. Move it to **In Review** when another person should check copy, dates, image rights, accessibility and external links.
3. Move it to **Ready** after approval.
4. Choose **Publish** only when the change should become public.

Publishing updates GitHub and starts an automatic website deployment. Allow a few minutes, then open the public page in a new tab and verify the result.

## Edit or archive a class

Open the class, make the change, and pass it through the editorial workflow (**Draft → In Review → Ready → Published**). After a class ends, set its status to **Past** and publish that change. Do not delete a class merely because it has ended.

If registration must stop immediately, close or pause sales in Zeffy first, then update the website status to **Sold out** or **Cancelled** and publish. Keep the class details synchronized on both platforms.

## Add a gallery photograph

1. Open **Gallery** and choose **New Photograph**.
2. Add a short caption, an accessible image description, the image and the appropriate category.
3. Set a display-order number. Lower numbers appear earlier, and the first featured photograph becomes the large introductory image.
4. Turn on **Featured** for photographs that should appear on the public About page. Leave it off to keep an uploaded record in the editor without displaying it.
5. Move the photograph through the editorial workflow (**Draft → In Review → Ready → Published**) and verify the public About page after deployment.

Only upload photographs CASA owns or has permission to publish. Do not upload private documents, contact lists, financial records, identification or images without confirmed usage rights.

## Add an external gallery link

Use an external gallery link for a substantial exhibition, publication, photobook or collection hosted elsewhere instead of duplicating all of its images on the CASA website.

1. Open **External galleries** and choose **New External gallery**.
2. Add its title, brief description, public `https://` URL and link label.
3. Upload a representative thumbnail image and add a concise description of what is visibly shown.
4. Set a display order and turn on **Display on About page**.
5. Move the link through the editorial workflow (**Draft → In Review → Ready → Published**), then test it from the public About page.

External links should lead directly to public, reputable pages and should be reviewed periodically for availability.

## Image preparation

Keep the CASA website gallery highly curated—approximately 20–30 excellent photographs rather than a comprehensive archive. Favor images that collectively show the studios, artists, artwork, learning and community. For larger bodies of work, add an external gallery link, such as the existing CASA 25th Anniversary photobook.

Until CASA adopts a different technical standard, use these practical defaults:

- JPEG or WebP in the sRGB color space.
- Approximately 1,600–2,400 pixels on the longest side.
- Preferably under 1 MB per image.
- Clear, descriptive filenames without confidential information.
- A concise description of the visible subject and activity for screen-reader users; do not repeat the caption word for word.

## Edit page introductions

Open **Page introductions** to update the title, search description, heading or introductory sentence for Home, About, Classes, Studio Space or Contact. Move the change through the editorial workflow (**Draft → In Review → Ready → Published**). These controls do not replace the full page layout; ask the website administrator for structural or design changes.

## Routine checks

Before every publication, confirm:

- Names, dates, times, prices, address and availability are correct.
- The Zeffy link opens the intended public campaign.
- Images are authorized, correctly oriented, reasonably sized and described accessibly.
- External gallery and publication links open the intended public pages.
- No private information or internal notes appear in public fields.
- A second person has reviewed consequential changes when possible.

After publication, check the live page on both a phone and a computer. If a deployment fails or the editor behaves unexpectedly, stop editing and contact the website administrator; do not change GitHub, Cloudflare or deployment settings as a workaround.
