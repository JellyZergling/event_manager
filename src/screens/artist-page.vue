<template>
    <a>artist</a>
</template>

<script setup lang="ts">
import { callVariableForArtist } from '../components/script_main';

async function callEvents() {
    const artistInfo = await callVariableForArtist();
    console.log(artistInfo);
}

callEvents();

</script>
<script lang="ts">
export default {
  name: 'ArtistPage',
  components: {
  },
};
</script>