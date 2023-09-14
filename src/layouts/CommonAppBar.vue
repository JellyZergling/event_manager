<template>
    <v-app-bar app id="appbar">
      <v-container class="mx-auto d-flex align-center justify-center">
        <img src="/images/sample_logo1.png" id="appbar-logo" />
        <v-spacer></v-spacer>
        <v-col cols="auto" class="d-flex align-center justify-center">
          <v-btn v-for = "nav in menuLinks"
            :key="nav.name"
            :text="nav.name"
            @click="navigateTo(nav.href)"
            class="nav-item">
            {{nav.name}}
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto" class="d-flex align-center justify-center">
          <v-btn
            v-for="link in loginLinks"
            :key="link"
            :text="link"
            variant="text"
          ></v-btn>
        </v-col>
      </v-container>
    </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CommonAppBar',
  data() {
    return {
      menuLinks: [
        {
          name: 'Main',
          href: '/main',
        },
        {
          name: 'Artist',
          href: '/artist',
        },
        {
          name: 'Connect',
          href: '/connect',
        },
      ],
      loginLinks: ['Login', 'Sign Up'],
    }
  },
  methods: {
    navigateTo(href: string) {
      const router = this.$router;
      router.push(href);
    }
  }
});
</script>