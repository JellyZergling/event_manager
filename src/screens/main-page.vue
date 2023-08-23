<template>
  <ul>
    <li v-for="eventData in upcomingEvents" :key="eventData.id" class="event-item">
      <EventItem
        :eventData="eventData"
        :getImageForEvent="getImageForEvent"
        :calculateDDay="calculateDDay"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { callScriptsForMain } from '../data/script_main';
import EventItem from './Module/event-item.vue';
import { ref } from 'vue';

const { upcomingEvents, getImageForEvent, calculateDDay } = callScriptsForMain();
</script>

<script lang="ts">
export default {
  name: 'MainPage',
  components: {
    EventItem,
  },
};
</script>