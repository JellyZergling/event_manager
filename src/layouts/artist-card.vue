<template>
  <div class="artistData-wrapper">
    <div class="artistData-info">
      <div class="artistData-name">
        {{ artistData.Name}}
      </div>
      <div class="artistData-date-info">
        <div class="artistTwitter">
          {{ artistData.Twit_Name }}
        </div>
        <div class="artistPixiv">
          {{ artistData.Pixiv_Name }}
        </div>
        <div class="artistEmail">
          {{ artistData.Email }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  artistData: Object,
});
</script>

<script lang="ts">
export default {
  name: 'artist-card',
}
</script>
