import axios from 'axios';
import { ref, onMounted, type Ref } from 'vue';

export interface Link {
  id: number;
  fullname: string;
  class: string;
  region: string;
  startdate: string;
  enddate: string;
  location: string;
}

export function useFetchLinks(): { links: Ref<Link[]> } {
  const links = ref<Link[]>([]);

  onMounted(async () => {
    try {
      const response = await axios.get('/api/links');
      links.value = response.data;
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  });
  return { links };
}
