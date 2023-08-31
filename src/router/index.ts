import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import MainPage from '../screens/main-page.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/main/',
    component: MainPage,
  },
  // 다른 라우트 설정...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
