<template>
  <ul>
    <li v-for="eventData in allEvents" :key="eventData.id" class="event-item">
      <button @click="handleTestClick('hi')">{{ selectedItem }}</button>
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
import { callScriptsForMain } from '../data/script_main';
import EventItem from './Module/event-item.vue';
import { ref, defineProps, watch, watchEffect} from 'vue';
import type { Link } from '../data/fetchLinks';

const props = defineProps({
  selectedItem: {
    type: String,
    required: true,
  },
});
const upcomingEvents = ref<Link[]>([]);
const pastEvents = ref<Link[]>([]);
let allEvents: Link[] = [];

watchEffect(() => {
  const { upcomingEvents: upcoming, pastEvents: past, getImageForEvent, calculateDDay } = callScriptsForMain(props.selectedItem);
  upcomingEvents.value = upcoming.value;
  pastEvents.value = past.value;

  allEvents = [...upcomingEvents.value, ...pastEvents.value];
});


function handleTestClick(text:string){
  console.log(text);
}
</script>

<script lang="ts">
export default {
  name: 'MainPage',
  components: {
    EventItem,
  },
};
</script>
