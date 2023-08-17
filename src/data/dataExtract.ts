import type { Link } from './fetchLinks';

export function processDatesInLinks(links: Link[]): Link[] {
  formatDateInLink(links);
  sortDateInLink(links);
  links = filterPastEvents(links);
  return links;
}

export function formatDateInLink(links: Link[]): void {
  for (const item of links) {
    for (const key of ['startdate', 'enddate'] as const) {
      const data = new Date(item[key]);
      item[key] = formatDate(data);
    }
  }
}

export function formatDate(date: Date): string {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

export function sortDateInLink(links: Link[]): Link[] {
  links.sort((a, b) => {
    const dateA = new Date(a.startdate);
    const dateB = new Date(b.startdate);
    return dateA.getTime() - dateB.getTime();
  });
  return links;
}

export function filterPastEvents(links: Link[]): {
  upcoming: Link[];
  past: Link[];
} {
  const now = new Date();
  const upcoming: Link[] = [];
  const past: Link[] = [];

  for (const item of links) {
    const startDate = new Date(item.startdate);
    const endDate = new Date(item.enddate);

    if (now >= startDate && now <= endDate) {
      upcoming.push(item);
    } else if (startDate > now) {
      upcoming.push(item);
    } else {
      past.push(item);
    }
  }
  return { upcoming, past };
}
