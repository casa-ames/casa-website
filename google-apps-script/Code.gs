const CASA_INBOX = 'admincasa0@gmail.com';

const INTEREST_LABELS = {
  classes: 'Classes',
  'studio-space': 'Studio space',
  general: 'Something else',
};

function doPost(event) {
  try {
    const values = event && event.parameter ? event.parameter : {};
    if (values.website) return jsonResponse({ ok: true });

    const name = clean(values.name, 120);
    const email = clean(values.email, 254);
    const interest = clean(values.interest, 40);
    const message = clean(values.message, 5000);

    if (!name || !isEmail(email) || !INTEREST_LABELS[interest] || !message) {
      return jsonResponse({ ok: false, message: 'Please complete every required field.' });
    }

    const category = INTEREST_LABELS[interest];
    const subject = `[CASA website — ${category}] Message from ${name}`;
    const body = [
      `Interest: ${category}`,
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      'Message:',
      message,
      '',
      'Sent from the CASA website contact form.',
    ].join('\n');

    MailApp.sendEmail({
      to: CASA_INBOX,
      subject,
      body,
      replyTo: email,
      name: 'CASA website',
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, message: 'The message could not be sent.' });
  }
}

function clean(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
