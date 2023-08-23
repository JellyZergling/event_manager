import axios from 'axios';
import { useFetchLinks } from './fetchLinks';
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

export function callScriptsForMain(){
  const { links, error } = useFetchLinks(); // 일정 DB 연결
  let upcomingEvents = ref<Link[]>([]);
  // let pastEvents = [];
  if (error.value) {
    console.error('Error fetching links:', error.value);
  }
  onMounted(async () => {
    try {
      const fetchedLinks = await fetchLinksFromApi();
      processAndSetLinks(fetchedLinks);
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  });

  async function fetchLinksFromApi() {
    const response = await axios.get('/api/links');
    return response.data;
  }

  function processAndSetLinks(fetchedLinks: Link[]) {
    processDatesInLinks(fetchedLinks);
    links.value = fetchedLinks;

    const { upcoming, past } = filterPastEvents(links.value);
    upcomingEvents.value = upcoming;
    // pastEvents.value = past;
    console.log('Upcoming events:', upcoming);
    console.log('Past events:', past);
  }


  const getImageForEvent = (eventClass: string) => IMAGE_PATHS[eventClass] || IMAGE_PATHS.default;

  return {upcomingEvents, getImageForEvent, calculateDDay};
}

export function callMainItems(){
  const dateOptions = ['Basic', 'All', 'Upcoming', 'Past'];
  return dateOptions;
}