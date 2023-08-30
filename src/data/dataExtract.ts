import type { Link } from './fetchLinks';

export function processDatesInLinks(links: Link[]){
  formatDateInLink(links);
  sortDateInLink(links);
  return links ;
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

export function filterPastEvents(links: Link[], selectedItem:string): {
  upcoming: Link[];
  past: Link[];
} {
  const now = new Date();
  const upcoming: Link[] = [];
  const past: Link[] = [];

  for (const item of links) {
    const startDate = new Date(item.startdate);
    const endDate = new Date(item.enddate);

    if (selectedItem === 'All'){
      if (now <= endDate) {
        upcoming.push(item);
      } else if (startDate > now) {
        upcoming.push(item);
      } else {
        past.push(item);
      }
    }else if(selectedItem === 'Basic' || selectedItem === 'Upcoming'){
      if (now <= endDate) {
        upcoming.push(item);
      }
    }else if (selectedItem === 'Past'){
      if (startDate < now) {
        past.push(item);
      }
    }
  }

  if (selectedItem === 'Basic') {
    const groupedByClassRegion: Record<string, Link[]> = upcoming.reduce((groups, item) => {
      const key = item.class + '-' + item.region;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    }, {} as Record<string,Link[]>);
  
    const upcomingBasic = Object.values(groupedByClassRegion).map(group => {
      return group.reduce((earliest, item) => {
        const startDate = new Date(item.startdate);
        const earliestStartDate = new Date(earliest.startdate);
        if (startDate < earliestStartDate) {
          return item;
        }
        return earliest;
      });
    });
  
    return { upcoming: upcomingBasic, past: [] };
  }else if (selectedItem === 'All') {
    return { upcoming, past };
  } else if (selectedItem === 'Upcoming') {
    return { upcoming, past: [] };
  } else if (selectedItem === 'Past') {
    return { upcoming: [], past };
  }

  return { upcoming: [], past: [] };
}


export function filterUpcomingEvents(upcoming: Link[]):Link[]{
  const upcomingFiltered: Link[] = [];
  const upcomingMap: Map<string, Link> = new Map();

  for(const item of upcoming){
    const key = `${item.class}-${item.region}`

    if(!upcomingMap.has(key)){
      upcomingMap.set(key, item);
    }else{
      const existingEvent = upcomingMap.get(key);
      if (existingEvent && existingEvent.startdate > item.startdate) {
        upcomingMap.set(key, item);
      }
    }
  }

  for (const [, event] of upcomingMap) {
    upcomingFiltered.push(event);
  }

  return upcomingFiltered;
}
