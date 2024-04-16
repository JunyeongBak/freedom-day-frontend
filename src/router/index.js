import { createRouter, createWebHistory } from "vue-router";
// TypeScript에서는 라우트 객체의 배열을 명시적으로 타입화할 필요가 있습니다.
const routes = [
  {
    path: "/",
    name : "Login",
    meta:{
      keepAlive: false,
    },
    component: () => import("@/views/member/SignIn.vue"),
  },
  {
    path: "/home/",
    name: "HomePage",
    meta: {
      title: "해방의날",
      keepAlive: true,
    },
    component: () => import("../views/home/GuestPage.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/member/SignUp.vue"),
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("../views/member/SignIn.vue"),
  },
  {
    path: "/loan-detail",
    name: "loan-detail",
    component: () => import("../views/loan/LoanDetail.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
