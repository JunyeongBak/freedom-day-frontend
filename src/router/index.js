import { createRouter, createWebHistory } from "vue-router";
import NotFound from '@/views/NotFound.vue';
import Error from '@/views/Error.vue';
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
    name: "해방의 날",
    meta: {
      title: "해방의날",
      keepAlive: false,
    },
    component: () => import("@/views/home/HomePage.vue"),
  },
  {
    path: "/signup",
    name: "회원가입",
    meta:{
      keepAlive: true,
    },
    component: () => import("@/views/member/SignUp.vue"),
  },
  {
    path: "/step2",
    name: "SignUpStep2",
    meta: {
      keepAlive: false,
    },
    component: () => import("@/views/member/SignUpStep2.vue"),
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("@/views/member/SignIn.vue"),
  },
  {
    path: "/loan-detail",
    name: "대출 상세페이지",
    component: () => import("@/views/loan/LoanDetail.vue"),
  },
  {
    path: "/loan/create",
    name: "대출추가",
    component: () => import("@/views/loan/LoanCreate.vue"),
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: NotFound 
  },
  {
    path: '/error',
    name: 'Error',
    component: Error
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // savedPosition은 popstate 네비게이션(브라우저의 뒤로/앞으로 버튼)에서 사용됩니다.
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});
export default router;
