const decodeDescription = (value) => String(value ?? '')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<br\s*\/?>/gi, '\n')
  .replace(/<\/(?:div|h[1-6]|li|p)>/gi, '\n')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'");

const cleanLine = (value) => value.replace(/[ \t]+/g, ' ').trim();

export const extractInstructor = (value) => {
  let instructor = null;
  const descriptionLines = [];

  for (const line of decodeDescription(value).replace(/\r/g, '').split('\n')) {
    const cleaned = cleanLine(line);
    if (!cleaned) continue;
    const match = cleaned.match(/^instructor\s*:\s*(.*)$/i);
    if (match) {
      const name = cleanLine(match[1]);
      if (!instructor && name) instructor = name;
      continue;
    }
    descriptionLines.push(cleaned);
  }

  return {
    description: descriptionLines.join(' ').replace(/\s+/g, ' ').trim(),
    instructor,
  };
};
