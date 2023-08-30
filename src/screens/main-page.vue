<template>
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
</template>

<script setup lang="ts">
import EventItem from './Module/event-item.vue';
import { defineProps, ref, watch, computed} from 'vue';
import { callScriptsForMain, callVariableForMain } from '../data/script_main';
import type { Link } from '../data/fetchLinks';

const props = defineProps({
  selectedItem: {
    type: String,
    required: true,
  },
});

const upcoming = ref<Link[]>([]);
const past = ref<Link[]>([]);

watch(() => props.selectedItem, async (newSelectedItem) => {
  await callEvents(newSelectedItem);
});

async function callEvents(selectedItem: string) {
  const { upcoming: upcomingData, past: pastData } = await callVariableForMain(selectedItem);
  console.log(past);
  upcoming.value = upcomingData;
  past.value = pastData;
}

callEvents(props.selectedItem);

const getFilteredEvents = computed(() => {
  if (props.selectedItem === 'Basic' || props.selectedItem === 'Upcoming') {
    return upcoming.value;
  } else if (props.selectedItem === 'Past') {
    return past.value;
  } else if ( props.selectedItem === 'All') {
    return [...past.value, ...upcoming.value];
  } else {
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

