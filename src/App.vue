<template>
  <v-app id="inspire">
    <v-app-bar app id="appbar">
      <v-container>
        <v-row class="fill-height">
          <v-col cols="auto" class="d-flex align-center">
            <img src="./components/sample_logo1.png" id="appbar-logo" />
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto" class="d-flex align-center justify-center">
            <v-btn
              v-for="link in menuLinks"
              :key="link"
              :text="link"
              variant="text"
            ></v-btn>
          </v-col>
          <v-col cols="auto" class="d-flex align-center"> </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <v-list-item
                  v-for="n in 5"
                  :key="n"
                  link
                  :title="`List Item ${n}`"
                ></v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  color="grey-lighten-4"
                  link
                  title="Refresh"
                ></v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <div>
                <ul>
                  <li v-for="event in upcomingEvents" :key="event.id">
                    {{ event.fullname }} - {{ event.startdate }} -
                    {{ event.enddate }}
                  </li>
                </ul>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useFetchLinks } from './data/fetchLinks';
import type { Link } from './data/fetchLinks';
import { processDatesInLinks, filterPastEvents } from './data/dataExtract';
import { onMounted, ref } from 'vue';

const menuLinks = ['Main', 'Messages', 'Profile', 'Updates'];

const { links } = useFetchLinks();
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
</script>

<script lang="ts">
export default {
  data: () => ({
    links: ['Main', 'Messages', 'Profile', 'Updates'],
  }),
};
</script>
