import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style/reset.scss'; // 리셋 스타일
import 'vant/lib/index.css'; // Vant 스타일 전역 임포트
import './style/common.scss'; // 공통 스타일
import './rem'; // rem 설정
import Vant from 'vant'; // Vant UI 라이브러리
import { Chart, registerables } from 'chart.js';
import { createPinia } from 'pinia';
import piniaPersistedState from 'pinia-persistedstate';
Chart.register(...registerables);
const pinia = createPinia();

// pinia 플러그인으로 persisted state 플러그인 등록
pinia.use(piniaPersistedState());

// createApp 함수를 사용하여 Vue 애플리케이션 인스턴스를 생성
createApp(App)
  .use(pinia)
  .use(Vant) // Vant 플러그인 사용
  .use(router) // Vue Router 사용
  .mount('#app'); // 앱을 #app 요소에 마운트
