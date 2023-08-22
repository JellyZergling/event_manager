<template>
  <div class="eventData-wrapper">
    <div class="eventData-image">
      <img :src="getImageForEvent(eventData.class)" alt="Event Image" />
    </div>
    <div class="eventData-info">
      <div class="eventData-name">
        {{ eventData.fullname }}
      </div>
      <div class="eventData-date-info">
        <div class="d-day">
          D-{{ calculateDDay(eventData.startdate) }}
        </div>
        <div class="eventData-date">
          {{ eventData.startdate }} - {{ eventData.enddate }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps as VueDefineProps } from 'vue';

const props = VueDefineProps({
  eventData: Object,
  getImageForEvent: Function,
  calculateDDay: Function,
});
</script>