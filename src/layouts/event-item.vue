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
          {{ calculateDDay(eventData.startdate, eventData.enddate) }}
        </div>
        <div class="eventData-date">
          {{ eventData.startdate }} - {{ eventData.enddate }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "@/assets/_event-item.scss";

const props = defineProps({
  eventData: Object,
  getImageForEvent: Function,
  calculateDDay: Function,
  selectedItem: String,
});

</script>

<script lang="ts">
export default {
  name: 'event-item',
}
</script>