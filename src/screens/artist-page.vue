<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-sheet rounded="lg" id="event-table">
        <ul>
          <li v-for="artistData in artistList" :key="artistData.id" class="artist-card">
            <ArtistCard
            :artistData=artistData
            />
          </li>
        </ul>
      </v-sheet>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import  ArtistCard  from '@/layouts/artist-card.vue'
import { ref, onMounted } from 'vue';
import { callVariableForArtist } from '@/components/callItems';
import type { Artist } from '@/components/fetchLinks';

const artistList = ref<Artist[]>([]);

onMounted(async () => {
  try {
    const artistInfo = await callVariableForArtist();
    artistList.value = artistInfo.value;
  } catch (e) {
    console.log(e);
  }
})

</script>
<script lang="ts">
export default {
  name: 'ArtistPage',
  components: {
    ArtistCard
  },
};
</script>