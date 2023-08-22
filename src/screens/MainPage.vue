<template>
  <ul>
    <li v-for="event in upcomingEvents" :key="event.id" class="event-item">
      <EventItem
        :event="event"
        :getImageForEvent="getImageForEvent"
        :calculateDDay="calculateDDay"
      />
    </li>
  </ul>
</template>
  
<script setup lang="ts">
import { callScriptsForMain } from '../data/script_main';
import EventItem from './Module/EventItem.vue';
import { Prop } from 'vue';

const { upcomingEvents, getImageForEvent, calculateDDay } = callScriptsForMain();

const props = defineProps({
  selectedItem: String,
});
</script>