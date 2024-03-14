import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// TypeScript에서는 라우트 객체의 배열을 명시적으로 타입화할 필요가 있습니다.
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "해방의날",
      keepAlive: true
    },
    component: () => import("../views/Home/index.vue"),
  }
  
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
export default router;
