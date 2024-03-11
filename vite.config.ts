import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // path 모듈 임포트

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/freedom-day/', // 애플리케이션의 베이스 URL 설정
  build: {
    outDir: 'docs', // 빌드 출력 디렉토리를 'docs'로 설정
    assetsDir: 'assets', // 정적 자산의 디렉토리 이름을 'assets'로 설정
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // '@' 별칭을 'src' 디렉토리로 설정
    },
  },
  server: {
    port: 5000, // 개발 서버의 포트를 5000으로 설정
    proxy: {
      // 필요한 경우 API 프록시 설정 추가
      // '/api': 'http://123.56.85.24:5000'
    },
  },
});
