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
            <v-sheet min-height="70vh" rounded="lg" class="event-list">
              <ul>
                <li v-for="event in upcomingEvents" :key="event.id" class="event-item">
                  <div class="event-wrapper">
                    <div class="event-image">
                      <img :src="getImageForEvent(event.class)" alt="Event Image" />
                    </div>
                    <div class="event-info">
                      <div class="event-name">
                        {{ event.fullname }}
                      </div>
                      <div class="event-date-info">
                        <div class="d-day">
                          D-{{ calculateDDay(event.startdate) }}
                        </div>
                        <div class="event-date">
                          {{ event.startdate }} - {{ event.enddate }}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
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
import { calculateDDay } from './data/dday';
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

    const { upcomingFiltered, past } = filterPastEvents(links.value);
    upcomingEvents.value = upcomingFiltered;
    // pastEvents.value = past;
    console.log('Upcoming events:', upcomingFiltered);
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
</script>

<script lang="ts">
export default {
  data: () => ({
    links: ['Main', 'Messages', 'Profile', 'Updates'],
  }),
};
</script>
