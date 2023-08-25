<template>
  <ul>
    <li v-for="eventData in getFilteredEvents" :key="eventData.id" class="event-item">
      <button @click="handleTestClick('hi')">{{eventData }}</button>
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
import { defineProps, ref, watch, onMounted, computed } from 'vue';
import { callScriptsForMain, callVariableForMain } from '../data/script_main';
import type { Link } from '../data/fetchLinks';

const props = defineProps({
  selectedItem: {
    type: String,
    required: true,
  },
});

const upcomingEvents = ref<Link[]>([]);
const pastEvents = ref<Link[]>([]);

async function updateEvents(selectedItem: string) {
  const { upcoming , past } = await callVariableForMain(selectedItem);
  upcomingEvents.value = upcoming.value;
  pastEvents.value = past.value;
}

watch(() => props.selectedItem, async (newSelectedItem) => {
  await updateEvents(newSelectedItem);
});

onMounted(async () => {
  await updateEvents(props.selectedItem);
});

const getFilteredEvents = computed(() => {
  if (props.selectedItem === 'Upcoming') {
    return upcomingEvents.value;
  } else if (props.selectedItem === 'Past') {
    return pastEvents.value;
  }
  return [];
});

function handleTestClick(text:string){
  console.log(upcomingEvents);
}

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

