<template>
  <v-app id="inspire">
    <CommonAppBar/>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import "./assets/main.css";
import CommonAppBar from '@/layouts/common-appbar.vue';

export default {
  components: {
    CommonAppBar,
  },
}
</script>