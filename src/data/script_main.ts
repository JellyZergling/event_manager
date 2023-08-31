import axios from 'axios';
import type { Link } from './fetchLinks';
import { processDatesInLinks, filterPastEvents } from './dataExtract';
import { ref } from 'vue';
import { calculateDDay } from './dday';

// call items ------------------------------------

const IMAGE_PATHS: Record<string, string> = {
  '코믹월드': '/images/comicWorld.png',
  '일러스타 페스': '/images/illustarFes.png',
  '원신축제':'/images/genshin.png',
  '블루아카이브페스티벌':'/images/blueArchive.png',
  'V-Festival':'/images/v_Festival.png',
  default: '/images/sample_logo1.png',
};

export function callScriptsForMain(){
  const getImageForEvent = (eventClass: string) => IMAGE_PATHS[eventClass] || IMAGE_PATHS.default;
  return {getImageForEvent, calculateDDay}
}

export function callScripts(){
  const menuLinks = ['Main', 'Artist', 'Connect'];
  const loginLinks = ['Login', 'Sign Up'];
  return {menuLinks, loginLinks};
};

export function callMainItems(){
  const dateOptions = ['Basic', 'All', 'Upcoming', 'Past'];
  return dateOptions;
}

// call items ------------------------------------

export async function callVariableForMain(selectedItem: string) {
  const upcomingEvents = ref<Link[]>([]);
  const pastEvents = ref<Link[]>([]);

  async function fetchLinksFromApi() {
    const response = await axios.get('/api/links');
    return response.data;
  }

  async function processAndSetLinks(selectedItem: string) {
    try {
      const fetchedLinks = await fetchLinksFromApi();
      const { upcoming, past } = filterPastEvents(fetchedLinks, selectedItem);
      const processedUpcoming = processDatesInLinks(upcoming);
      const processedPast = processDatesInLinks(past);

      upcomingEvents.value = processedUpcoming;
      pastEvents.value = processedPast;
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  }
  await processAndSetLinks(selectedItem);

  return { upcoming : upcomingEvents.value, past: pastEvents.value};
}

