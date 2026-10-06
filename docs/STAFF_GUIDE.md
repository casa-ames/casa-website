# CASA website staff guide

This guide covers routine content updates. It does not require coding.

## Sign in

1. Open `https://casa-ames.github.io/casa-website/admin/` in a regular web browser.
2. Choose **Login with GitHub** and authorize the CASA Website Editor.
3. Sign in with your own GitHub account. CASA should never share one account or password among staff.

Your GitHub account must have access to the `casa-ames/casa-website` repository. Ask a CASA GitHub organization owner if the editor does not open.

## Add a class or event

For anything that uses Zeffy registration, enter the information **once in Zeffy**. The CASA website securely imports event titles, descriptions, dates and recurring occurrences into its public calendar. The automatic refresh runs every four hours; publishing any other website edit also refreshes the Zeffy information.

### Create the campaign in Zeffy

1. Sign in to CASA’s Zeffy account.
2. Open **Campaigns**, choose **+ New campaign**, and select **Event**.
3. Enter the class title, date or dates, start and end times, and CASA’s address.
4. Add the description and CASA branding. For the campaign image, open **Prepare an image**, choose **Zeffy event**, and upload the resulting square JPG. The website schedule uses the same square composition.
5. Create the ticket or registration type, including its price and available quantity. For a free class, enter a ticket price of `0` rather than leaving the price blank.
6. Add only the attendee questions CASA genuinely needs.
7. Review the confirmation message, reminder settings, sales closing time, cancellation information and any additional-donation option.
8. Preview the event on both desktop and mobile, then complete the builder until Zeffy shows the confirmation that the campaign has been created.
9. Publish the campaign and open its public page once to confirm that registration works.
10. Allow up to four hours for it to appear on the CASA website calendar. A website administrator can also run the **Deploy website** workflow in GitHub for an immediate refresh.

For the current Zeffy interface, see [Configuring an Event Campaign](https://support.zeffy.com/configuring-an-event-campaign-on-zeffy-rd9ar) and [How to Find Your Campaign’s Share Link](https://support.zeffy.com/how-to-find-your-campaigns-share-link-p6cug).

After the refresh, open the public **Events** page. Confirm that every occurrence appears on the correct calendar date and that the registration button opens the intended Zeffy campaign.

### Add a website-only listing

Use **Website-only listings** in the CASA Website Editor only when an announcement should appear in the schedule but has no Zeffy campaign—for example, an informational open house without registration. Do not duplicate an event already maintained in Zeffy.

1. Open **Website-only listings** and choose **New Website-only listing**.
2. Enter its public title, summary, dates, time, location and any other applicable information.
3. Upload a prepared image, add an accessible image description and enter its focal-point settings. Use the square preview because all schedule thumbnails are square.
4. Select its availability and whether it should appear on the homepage.
5. Save it and move it through the editorial workflow (**Draft → In Review → Ready → Published**).

## Review and publish

CASA uses an editorial workflow (**Draft → In Review → Ready → Published**) so incomplete changes do not immediately reach the public website.

1. Keep work in **Draft** while details are incomplete.
2. Move it to **In Review** when another person should check copy, dates, image rights, accessibility and external links.
3. Move it to **Ready** after approval.
4. Choose **Publish** only when the change should become public.

Publishing updates GitHub and starts an automatic website deployment. Allow a few minutes, then open the public page in a new tab and verify the result.

## Edit or archive a class or event

For a Zeffy-managed class or event, make the change in Zeffy. The public calendar will update during the next automatic refresh. Close, cancel or archive registration in Zeffy before making a public announcement elsewhere.

For a website-only listing, open it in the editor, make the change, and pass it through the editorial workflow (**Draft → In Review → Ready → Published**). After it ends, set its status to **Past** rather than deleting its record.

## Add or reuse a website image

The **Image library** indexes CASA photographs used throughout the website. Existing photographs can be selected again from the image field’s media browser without uploading a duplicate.

1. Open **Image library** and choose **New Image**.
2. Add a short caption, an accessible image description, the image and the appropriate category.
3. Enter the horizontal and vertical focal-point numbers copied from **Prepare an image**. Preview both a wide frame and a thumbnail when the photograph may appear in more than one place.
4. Set a display-order number. Lower numbers appear earlier.
5. Turn on **Show on About page** only for a small, curated selection. The first selected image becomes the large introductory image there.
6. Turn on **Show in homepage hero** for photographs that should join the seven-second homepage rotation. Keep approximately 5–7 strong images selected and include a balance of close artwork details, people and wider views.
7. Move the image through the editorial workflow (**Draft → In Review → Ready → Published**) and verify the relevant public page after deployment.

Only upload photographs CASA owns or has permission to publish. Do not upload private documents, contact lists, financial records, identification or images without confirmed usage rights.

## Add an external gallery link

Use an external gallery link for a substantial exhibition, publication, photobook or collection hosted elsewhere instead of duplicating all of its images on the CASA website.

1. Open **External galleries** and choose **New External gallery**.
2. Add its title, brief description, public `https://` URL and link label.
3. Upload a representative thumbnail image and add a concise description of what is visibly shown.
4. Enter the horizontal and vertical focal-point numbers copied from **Prepare an image**.
5. Set a display order and turn on **Display on About page**.
6. Move the link through the editorial workflow (**Draft → In Review → Ready → Published**), then test it from the public About page.

External links should lead directly to public, reputable pages and should be reviewed periodically for availability.

## Image preparation

Keep the CASA website gallery highly curated—approximately 20–30 excellent photographs rather than a comprehensive archive. Favor images that collectively show the studios, artists, artwork, learning and community. For larger bodies of work, add an external gallery link, such as the existing CASA 25th Anniversary photobook.

Open **Prepare an image** from the red button at the lower-right corner of the CASA website editor. You can also open `https://casa-ames.github.io/casa-website/image-prep/` directly. The tool first asks where the photograph will be used.

### Prepare an image for the CASA website

1. Choose **CASA website**, then choose the original JPG, PNG or WebP from your computer.
2. Choose a framing preview that resembles the intended placement. The square option matches event thumbnails, the 4:3 option matches gallery thumbnails, and the wide option is useful for banners and wide gallery arrangements.
3. Drag the photograph within the preview—or use the horizontal and vertical sliders—until faces and other important details sit comfortably inside the frame. The faint inner rectangle is a conservative safe area for important subjects.
4. Try any other framing shapes in which the photograph may appear. The preview does not permanently crop the photograph.
5. Choose **Copy focal point**, then choose **Download WebP**.
6. Return to the CASA editor, upload the newly downloaded file ending in `-web.webp`, and enter the two focal-point numbers. Do not upload the large original.

### Prepare an image for a Zeffy event

1. Choose **Zeffy event**, then choose the original JPG, PNG or WebP from your computer.
2. Drag the photograph within the square preview—or use the sliders—until the important subject is comfortably framed.
3. Choose **Download JPG**. The file ending in `-zeffy.jpg` is a square image no larger than 1,200 × 1,200 pixels.
4. Upload that JPG as the campaign banner in Zeffy. Do not create a duplicate event or upload the image again in the CASA editor; the website imports the Zeffy event and displays that same square crop in the schedule.

The tool works entirely in the browser: the original is not sent anywhere. CASA website images are resized, compressed and converted to WebP before they reach GitHub. Zeffy images are converted to a square JPG and remain hosted by Zeffy. The CASA editor rejects files larger than 2 MB as an additional safeguard.

For CASA website images, the downloaded WebP retains the complete photograph rather than permanently cutting away its edges. The focal-point settings tell the website how to position that image whenever a layout needs to crop it. This makes the same image reusable while helping prevent faces from being cut off awkwardly.

Use these practical defaults:

- For the CASA editor, use the WebP produced by the preparation tool; for Zeffy, use its square JPG.
- Class and gallery photographs are limited to 2,400 pixels on the longest side.
- Zeffy campaign images are square JPG files limited to 1,200 × 1,200 pixels.
- The tool aims for approximately 1 MB or less while retaining good visual quality.
- Clear, descriptive filenames without confidential information.
- A concise description of the visible subject and activity for screen-reader users; do not repeat the caption word for word.

## Edit page introductions

Open **Page introductions** to update the title, search description, heading or introductory sentence for Home, About, Classes, Studio Space or Contact. Move the change through the editorial workflow (**Draft → In Review → Ready → Published**). These controls do not replace the full page layout; ask the website administrator for structural or design changes.

## Routine checks

Before every publication, confirm:

- Names, dates, times, prices, address and availability are correct.
- Every Zeffy occurrence appears on the intended calendar date and its registration button opens the intended public campaign.
- Images are authorized, correctly oriented, reasonably sized and described accessibly.
- External gallery and publication links open the intended public pages.
- No private information or internal notes appear in public fields.
- A second person has reviewed consequential changes when possible.

After publication, check the live page on both a phone and a computer. If a deployment fails or the editor behaves unexpectedly, stop editing and contact the website administrator; do not change GitHub, Cloudflare or deployment settings as a workaround.
