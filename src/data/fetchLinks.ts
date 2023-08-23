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

interface FetchLinksResult {
  links: Ref<Link[]>;
  error: Ref<string | null>;
}

export function useFetchLinks(): FetchLinksResult {
  const links = ref<Link[]>([]);
  const error = ref<string | null>(null);

  async function fetchData() {
    try {
      const response = await axios.get('/api/links');
      links.value = response.data;
    } catch (err) {
      error.value = 'Error fetching links';
      console.error('Error fetching links:', err);
    }
  }

  onMounted(() => {
    fetchData();
  });

  return { links, error };
}