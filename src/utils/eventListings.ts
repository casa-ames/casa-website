const timeZone = 'America/Chicago';

export interface EventOccurrence {
  id: string;
  title: string;
  summary: string;
  kind: 'Class' | 'Event';
  start: Date;
  end?: Date;
  dateKey: string;
  monthKey: string;
  dateLabel: string;
  timeLabel: string;
  instructor?: string;
  price?: string;
  location?: string;
  image?: string;
  imageAlt?: string;
  registrationUrl?: string;
  status: 'upcoming' | 'sold-out' | 'cancelled' | 'coming-soon';
  source: 'website' | 'zeffy';
}

interface ZeffyOccurrence {
  id: string;
  start: string;
  end?: string | null;
}

interface ZeffyEvent {
  id: string;
  title: string;
  description?: string;
  type?: string;
  status?: string;
  url?: string | null;
  location?: string | null;
  image?: string | null;
  occurrences?: ZeffyOccurrence[];
}

interface ZeffyData {
  events?: ZeffyEvent[];
}

const parts = (date: Date) => Object.fromEntries(
  new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date).filter(({ type }) => type !== 'literal').map(({ type, value }) => [type, value]),
);

const dateKey = (date: Date) => {
  const value = parts(date);
  return `${value.year}-${value.month}-${value.day}`;
};

const monthKey = (date: Date) => dateKey(date).slice(0, 7);

const eventDateLabel = (date: Date) => new Intl.DateTimeFormat('en-US', {
  timeZone,
  month: 'short',
  day: 'numeric',
}).format(date).toUpperCase();

const eventTimeLabel = (start: Date, end?: Date) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
  });
  const startLabel = formatter.format(start).replace(':00', '');
  const endLabel = end ? formatter.format(end).replace(':00', '') : '';
  return endLabel ? `${startLabel}–${endLabel}` : startLabel;
};

const cleanSummary = (value = '') => {
  const summary = value.replace(/\s+/g, ' ').trim();
  return summary.length > 190 ? `${summary.slice(0, 187).trimEnd()}…` : summary;
};

const safeDate = (value: unknown) => {
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
};

export function buildEventOccurrences(classEntries: any[], zeffyData: ZeffyData): EventOccurrence[] {
  const websiteEvents: EventOccurrence[] = classEntries
    .filter(({ data }) => data.status !== 'past')
    .map(({ id, data }) => {
      const start = safeDate(data.dateStart)!;
      const end = safeDate(data.dateEnd) ?? undefined;
      return {
        id: `class-${id}`,
        title: data.title,
        summary: cleanSummary(data.summary),
        kind: 'Class' as const,
        start,
        end,
        dateKey: dateKey(start),
        monthKey: monthKey(start),
        dateLabel: data.dateLabel,
        timeLabel: data.time,
        instructor: data.instructor,
        price: data.price,
        location: data.location,
        image: data.image,
        imageAlt: data.imageAlt,
        registrationUrl: data.registrationUrl,
        status: data.status,
        source: 'website' as const,
      };
    });

  const zeffyEvents: EventOccurrence[] = (zeffyData.events ?? []).flatMap((event) =>
    (event.occurrences ?? []).flatMap((occurrence, index) => {
      const start = safeDate(occurrence.start);
      if (!start) return [];
      const end = safeDate(occurrence.end) ?? undefined;
      const normalizedStatus = event.status?.toLowerCase() ?? '';
      const status = /cancel/.test(normalizedStatus)
        ? 'cancelled'
        : /sold|closed/.test(normalizedStatus)
          ? 'sold-out'
          : event.url
            ? 'upcoming'
            : 'coming-soon';
      return [{
        id: `zeffy-${event.id}-${occurrence.id || index + 1}`,
        title: event.title,
        summary: cleanSummary(event.description) || 'See event information and registration details on Zeffy.',
        kind: /class|workshop/i.test(`${event.type} ${event.title}`) ? 'Class' as const : 'Event' as const,
        start,
        end,
        dateKey: dateKey(start),
        monthKey: monthKey(start),
        dateLabel: eventDateLabel(start),
        timeLabel: eventTimeLabel(start, end),
        location: event.location || "Creative Artists’ Studios of Ames",
        image: event.image || undefined,
        imageAlt: event.image ? `${event.title} event image` : undefined,
        registrationUrl: event.url || undefined,
        status,
        source: 'zeffy' as const,
      }];
    }),
  );

  const zeffyUrls = new Set(zeffyEvents.map(({ registrationUrl }) => registrationUrl).filter(Boolean));
  return [...websiteEvents.filter(({ registrationUrl }) => !registrationUrl || !zeffyUrls.has(registrationUrl)), ...zeffyEvents]
    .sort((a, b) => a.start.getTime() - b.start.getTime());
}

export function monthLabel(key: string) {
  const [year, month] = key.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' })
    .format(new Date(Date.UTC(year, month - 1, 1, 12)));
}
