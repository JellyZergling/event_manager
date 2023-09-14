import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import MainPage from '@/screens/main-page.vue';
import ArtistPage from '@/screens/artist-page.vue';
import ConnectPage from '@/screens/connect-page.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: MainPage,
  },
  {
    path: '/artist',
    component: ArtistPage,
  },
  {
    path: '/connect',
    component: ConnectPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
