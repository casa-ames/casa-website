# CASA website staff guide

This guide covers routine content updates. It does not require coding.

## Sign in

1. Open `https://casa-ames.github.io/casa-website/admin/` in a regular web browser.
2. Choose **Login with GitHub** and authorize the CASA Website Editor.
3. Sign in with your own GitHub account. CASA should never share one account or password among staff.

Your GitHub account must have access to the `casa-ames/casa-website` repository. Ask a CASA GitHub organization owner if the editor does not open.

## Publish a class

1. Open **Classes** and choose **New Class**.
2. Complete every public field. The display date is the short label visitors see, while the start and end dates control chronological ordering.
3. Upload one landscape-oriented image and write an image description that explains what is visibly happening.
4. Choose the correct status:
   - **Open** shows the registration action when a Zeffy link is present.
   - **Registration coming soon** announces the offering without opening sales.
   - **Sold out** or **Cancelled** clearly closes registration.
   - **Past** removes the class from current public listings while keeping its record in the editor.
5. Turn on **Show on homepage** only for a small number of current priority offerings.
6. Paste the class's public Zeffy URL into **Zeffy registration link**. Do not paste a Zeffy dashboard or edit URL.
7. Save the entry as a draft.

Zeffy and the CASA website are separate systems. Dates, prices, capacity, cancellation details, and class titles must agree in both places before publishing.

## Review and publish

CASA uses an editorial workflow so incomplete changes do not immediately reach the public website.

1. Keep work in **Draft** while details are incomplete.
2. Move it to **In Review** when another person should check copy, dates, image rights, accessibility, and the Zeffy link.
3. Move it to **Ready** after approval.
4. Choose **Publish** only when the change should become public.

Publishing updates GitHub and starts an automatic website deployment. Allow a few minutes, then open the public page in a new tab and verify the result.

## Edit or archive a class

Open the class, make the change, and pass it through the same Draft → In Review → Ready → Publish sequence. After a class ends, set its status to **Past** and publish that change. Do not delete a class merely because it has ended.

If registration must stop immediately, close or pause sales in Zeffy first, then update the website status to **Sold out** or **Cancelled** and publish.

## Add a gallery photograph

1. Open **Gallery** and choose **New Photograph**.
2. Add a short caption, an accessible image description, the image, and the appropriate category.
3. Set a display-order number. Lower numbers appear earlier.
4. Use **Featured** sparingly for photographs CASA wants emphasized.
5. Complete the editorial workflow and verify the public About page after deployment.

Only upload photographs CASA owns or has permission to publish. Do not upload private documents, contact lists, financial records, identification, or images without confirmed usage rights.

## Image preparation

Until CASA adopts a different standard, use these practical defaults:

- JPEG or WebP in the sRGB color space.
- Approximately 1,600–2,400 pixels on the longest side.
- Preferably under 1 MB per image.
- Clear, descriptive filenames without confidential information.
- A concise description of the visible subject and activity for screen-reader users; do not repeat the caption word for word.

## Edit page introductions

Open **Page introductions** to update the title, search description, heading, or introductory sentence for Home, About, Classes, Studio Space, or Contact. These controls do not replace the full page layout. Ask the website administrator for structural or design changes.

## Routine checks

Before every publication, confirm:

- Names, dates, times, prices, address, and availability are correct.
- The Zeffy link opens the intended public campaign.
- The image is authorized, correctly oriented, and described accessibly.
- No private information or internal notes appear in public fields.
- A second person has reviewed consequential changes when possible.

After publication, check the live page on both a phone and a computer. If a deployment fails or the editor behaves unexpectedly, stop editing and contact the website administrator; do not change GitHub, Cloudflare, or deployment settings as a workaround.
