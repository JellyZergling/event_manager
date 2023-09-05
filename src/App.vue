<template>
  <v-app id="inspire">
    <v-app-bar app id="appbar">
      <v-container>
        <v-row class="fill-height">
          <v-col cols="auto" class="d-flex align-center">
            <img src="/images/sample_logo1.png" id="appbar-logo" />
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto" class="d-flex align-center justify-center">
            <v-btn v-for = "nav in menuLinks"
              :key="nav.name"
              :text="nav.name">
              <RouterLink
              :to="nav.href"
              class="nav-item"
              active-class="active">
              {{nav.name}}
              </RouterLink>
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
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <v-list-item
                  v-for="listItem in dateOptions"
                  :key="listItem"
                  link
                  :title="listItem"
                  @click="handleListItemClick(listItem)"
                ></v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  color="grey-lighten-4"
                  link
                  title="Refresh"
                  @click="handleListItemClick('Refresh')"
                ></v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet rounded="lg" id="event-table">
              <mainpage :selectedItem="selectedItem"/>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { callScripts, callMainItems } from './components/script_main';
import { ref } from 'vue';

const { menuLinks, loginLinks } = callScripts();
const dateOptions = callMainItems();
const selectedItem = ref<string>('Basic');

const handleListItemClick = (item: string) => {
  selectedItem.value = item;
};

</script>

<script lang="ts">
import "./assets/main.css";
import { defineComponent } from 'vue';
import MainPage from './screens/main-page.vue'
import ArtistPage from './screens/artist-page.vue';
import ConnectPage from './screens/connect-page.vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
  components: {
    mainpage: MainPage,
    artistpage: ArtistPage,
    connectpage: ConnectPage,
    data() {
      return {
        navigations:[
          {
            name : 'Main',
            href : '/Main',
          },
          {
            name : 'Artist',
            href : '/Artist',
          },
          {
            name : 'Connect',
            href : '/Connect',
          }
        ]
        // links: ['Main', 'Artist', 'Connect'],
      }
    }
  },
});
</script>