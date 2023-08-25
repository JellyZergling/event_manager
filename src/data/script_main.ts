import axios from 'axios';
import type { Link } from './fetchLinks';
import { processDatesInLinks, filterPastEvents } from './dataExtract';
import { onMounted, ref} from 'vue';
import { calculateDDay } from './dday';

const IMAGE_PATHS: Record<string, string> = {
  '코믹월드': './src/components/comicWorld.png',
  '일러스타 페스': './src/components/illustarFes.png',
  default: './src/components/sample_logo1.png',
};

export function callScripts(){
  const menuLinks = ['Main', 'Artist', 'Connect'];
  const loginLinks = ['Login', 'Sign Up'];
  return {menuLinks, loginLinks};
};

export function callVariableForMain(selectedItem: string) {
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
  processAndSetLinks(selectedItem);
  return { upcoming : upcomingEvents, past: pastEvents};
}

export function callScriptsForMain(){
  const getImageForEvent = (eventClass: string) => IMAGE_PATHS[eventClass] || IMAGE_PATHS.default;
  return {getImageForEvent, calculateDDay}
}

export function callMainItems(){
  const dateOptions = ['Basic', 'All', 'Upcoming', 'Past'];
  return dateOptions;
}