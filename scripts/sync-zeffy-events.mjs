import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const apiKey = process.env.ZEFFY_API_KEY?.trim();
const isCi = process.env.CI === 'true';
const outputPath = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/zeffy-events.json');
const apiBase = 'https://api.zeffy.com/api/v1';

if (!apiKey) {
  if (isCi) throw new Error('ZEFFY_API_KEY is required for the production build.');
  console.log('ZEFFY_API_KEY is not set; keeping the local fallback event data.');
  process.exit(0);
}

const firstValue = (object, keys) => {
  for (const key of keys) {
    const value = object?.[key];
    if (value !== undefined && value !== null && value !== '') return value;
  }
  return undefined;
};

const asArray = (value) => Array.isArray(value) ? value : [];

const plainText = (value) => String(value ?? '')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/\s+/g, ' ')
  .trim();

const isoDate = (value) => {
  if (value === undefined || value === null || value === '') return null;
  const numeric = typeof value === 'number' || /^\d{10,13}$/.test(String(value))
    ? Number(value)
    : null;
  const date = numeric === null
    ? new Date(String(value))
    : new Date(numeric < 1_000_000_000_000 ? numeric * 1000 : numeric);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const campaignUrl = (campaign) => {
  const direct = firstValue(campaign, [
    'public_url', 'publicUrl', 'share_url', 'shareUrl', 'campaign_url',
    'campaignUrl', 'form_url', 'formUrl', 'url', 'external_url', 'externalUrl',
  ]);
  if (direct && /^https?:\/\//i.test(String(direct))) return String(direct);
  const slug = firstValue(campaign, ['slug', 'public_slug', 'publicSlug']);
  return slug ? `https://www.zeffy.com/en-US/ticketing/${slug}` : null;
};

const occurrenceObjects = (campaign) => {
  const nested = firstValue(campaign, [
    'occurrences', 'event_occurrences', 'eventOccurrences', 'event_dates',
    'eventDates', 'dates', 'sessions',
  ]);
  const occurrences = asArray(nested);
  if (occurrences.length) return occurrences;
  return [campaign];
};

const normalizeOccurrence = (occurrence, index) => {
  const start = isoDate(firstValue(occurrence, [
    'start', 'starts_at', 'startsAt', 'start_at', 'startAt', 'start_date',
    'startDate', 'date_start', 'dateStart', 'date', 'event_date', 'eventDate',
  ]));
  if (!start) return null;
  const end = isoDate(firstValue(occurrence, [
    'end', 'ends_at', 'endsAt', 'end_at', 'endAt', 'end_date', 'endDate',
    'date_end', 'dateEnd',
  ]));
  return {
    id: String(firstValue(occurrence, ['id', '_id', 'occurrence_id', 'occurrenceId']) ?? index + 1),
    start,
    end,
  };
};

const normalizeCampaign = (campaign) => {
  const id = firstValue(campaign, ['id', '_id', 'campaign_id', 'campaignId', 'uuid']);
  const title = plainText(firstValue(campaign, ['title', 'name', 'campaign_name', 'campaignName']));
  const type = plainText(firstValue(campaign, ['type', 'campaign_type', 'campaignType', 'form_type', 'formType', 'category'])).toLowerCase();
  const occurrences = occurrenceObjects(campaign)
    .map(normalizeOccurrence)
    .filter(Boolean)
    .sort((a, b) => a.start.localeCompare(b.start));
  const excludedType = /donation|membership|shop|store|auction|raffle|peer|p2p/.test(type);
  const eventType = /event|ticket|class|workshop/.test(type);
  if (!id || !title || excludedType || (!eventType && occurrences.length === 0)) return null;

  const locationValue = firstValue(campaign, ['location', 'venue', 'address', 'event_location', 'eventLocation']);
  const location = typeof locationValue === 'object'
    ? plainText([
        firstValue(locationValue, ['name', 'label']),
        firstValue(locationValue, ['line1', 'address_line_1', 'street']),
        firstValue(locationValue, ['city']),
        firstValue(locationValue, ['state', 'province']),
      ].filter(Boolean).join(', '))
    : plainText(locationValue);

  const imageValue = firstValue(campaign, ['image_url', 'imageUrl', 'banner_url', 'bannerUrl', 'cover_url', 'coverUrl', 'image']);
  const image = typeof imageValue === 'string' && /^https?:\/\//i.test(imageValue) ? imageValue : null;

  return {
    id: String(id),
    title,
    description: plainText(firstValue(campaign, ['description', 'summary', 'content', 'details'])),
    type: type || 'event',
    status: plainText(firstValue(campaign, ['status', 'state'])).toLowerCase() || 'active',
    url: campaignUrl(campaign),
    location: location || null,
    image,
    occurrences,
  };
};

const getJson = async (url) => {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Zeffy API request failed with status ${response.status}.`);
  }
  return response.json();
};

const listCampaigns = async () => {
  const campaigns = [];
  let cursor = null;
  do {
    const url = new URL(`${apiBase}/campaigns`);
    url.searchParams.set('limit', '100');
    if (cursor) url.searchParams.set('starting_after', cursor);
    const page = await getJson(url);
    const items = Array.isArray(page) ? page : asArray(page.data ?? page.results ?? page.campaigns);
    campaigns.push(...items);
    cursor = page?.has_more ? (page.next_cursor ?? page.nextCursor ?? null) : null;
  } while (cursor);
  return campaigns;
};

const campaigns = await listCampaigns();
if (campaigns.length) {
  console.log(`Zeffy campaign fields detected: ${Object.keys(campaigns[0]).sort().join(', ')}`);
}

const detailedCampaigns = [];
for (const campaign of campaigns) {
  const id = firstValue(campaign, ['id', '_id', 'campaign_id', 'campaignId', 'uuid']);
  if (!id) {
    detailedCampaigns.push(campaign);
    continue;
  }
  try {
    detailedCampaigns.push(await getJson(`${apiBase}/campaigns/${encodeURIComponent(String(id))}`));
  } catch (error) {
    console.warn(`Could not load details for campaign ${id}; using the list record.`);
    detailedCampaigns.push(campaign);
  }
}

const events = detailedCampaigns
  .map((campaign) => normalizeCampaign(campaign?.data ?? campaign))
  .filter(Boolean)
  .sort((a, b) => (a.occurrences[0]?.start ?? '').localeCompare(b.occurrences[0]?.start ?? ''));

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify({
  syncedAt: new Date().toISOString(),
  source: 'zeffy-api',
  events,
}, null, 2)}\n`, 'utf8');

console.log(`Imported ${events.length} event campaign${events.length === 1 ? '' : 's'} from Zeffy.`);
