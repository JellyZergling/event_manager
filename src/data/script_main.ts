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

export function callScriptsForMain(selectedItem: string){
  let upcomingEvents = ref<Link[]>([]);
  let pastEvents = ref<Link[]>([]);
  onMounted(async () => {
    try {
      const fetchedLinks = await fetchLinksFromApi();
      processAndSetLinks(fetchedLinks, selectedItem);
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  });

  async function fetchLinksFromApi() {
    const response = await axios.get('/api/links');
    return response.data;
  }

  function processAndSetLinks(fetchedLinks: Link[], selectedItem: string) {
    const{ upcoming, past } = filterPastEvents(fetchedLinks, selectedItem);
    const processedUpcoming = processDatesInLinks(upcoming);
    const processedPast = processDatesInLinks(past);

    upcomingEvents.value = processedUpcoming;
    pastEvents.value = past;
    console.log('Upcoming events:', processedUpcoming);
    console.log('Past events:', processedPast);
  }


  const getImageForEvent = (eventClass: string) => IMAGE_PATHS[eventClass] || IMAGE_PATHS.default;

  return {upcomingEvents, pastEvents, getImageForEvent, calculateDDay};
}

export function callMainItems(){
  const dateOptions = ['Basic', 'All', 'Upcoming', 'Past'];
  return dateOptions;
}