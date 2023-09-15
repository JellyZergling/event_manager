<template>
  <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <v-list-item
                  v-for="listItem in dateOptions"
                  :key="listItem"
                  link
                  :title="listItem"
                  @click="handleListItemClick(listItem)"
                ></v-list-item>
              </v-list>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet rounded="lg" id="event-table">
              <ul>
                <li v-for="eventData in getFilteredEvents" :key="eventData.id" class="event-item">
                  <EventItem
                    :eventData="eventData"
                    :getImageForEvent="getImageForEvent"
                    :calculateDDay="calculateDDay"
                    :selectedItem="selectedItem"
                  />
                </li>
              </ul>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script setup lang="ts">
import EventItem from '@/layouts/event-item.vue';
import { ref, watch, computed } from 'vue';
import { callScriptsForMain, callVariableForMain, callMainItems  } from '@/components/callItems';
import type { Link } from '@/components/fetchLinks';

const dateOptions = callMainItems();
const selectedItem = ref<string>('Basic');
const upcoming = ref<Link[]>([]);
const past = ref<Link[]>([]);

async function callEvents(selectedItem: string) {
  const { upcoming: upcomingData, past: pastData } = await callVariableForMain(selectedItem);
  upcoming.value = upcomingData;
  past.value = pastData;
}

const handleListItemClick = (item: string) => {
  selectedItem.value = item;
};

watch(selectedItem, callEvents, { immediate: true });

const getFilteredEvents = computed(() => {
  switch (selectedItem.value) {
    case 'Basic':
    case 'Upcoming':
      return upcoming.value;
    case 'Past':
      return past.value;
    case 'All':
      return [...past.value, ...upcoming.value];
    default:
      return [];
  }
});

const {getImageForEvent, calculateDDay} = callScriptsForMain();
</script>

<script lang="ts">
export default {
  name: 'MainPage',
  components: {
    EventItem,
  },
};
</script>