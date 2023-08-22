import axios from 'axios';
import { useFetchLinks } from './fetchLinks';
import type { Link } from './fetchLinks';
import { processDatesInLinks, filterPastEvents } from './dataExtract';
import { onMounted, ref} from 'vue';
import { calculateDDay } from './dday';

export function callScripts(){
    const menuLinks = ['Main', 'Artist', 'Connect'];
    const loginLinks = ['Login', 'Sign Up'];

    return {menuLinks, loginLinks};
};

export function callScriptsForMain(){
  const { links } = useFetchLinks(); // 일정 DB 연결
    let upcomingEvents = ref<Link[]>([]);
    // let pastEvents = [];

    onMounted(async () => {
      try {
        const response = await axios.get('/api/links');
        const fetchedLinks = response.data;

        processDatesInLinks(fetchedLinks);
        links.value = fetchedLinks;

        const { upcoming, past } = filterPastEvents(links.value);
        upcomingEvents.value = upcoming;
        // pastEvents.value = past;
        console.log('Upcoming events:', upcoming);
        console.log('Past events:', past);
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    });

    const getImageForEvent = (eventClass: string) => {
      if (eventClass === '코믹월드') {
        return './src/components/comicWorld.png';
      } else if (eventClass === '일러스타 페스') {
        return './src/components/illustarFes.png';
      } else
      return './src/components/sample_logo1.png';
    };

    return {upcomingEvents, getImageForEvent, calculateDDay};
}

export function callMainItems(){
  const dateOptions = ['Basic', 'All', 'Upcoming', 'Past'];
  return dateOptions;
}