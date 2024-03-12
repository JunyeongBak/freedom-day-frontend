<template>
  <div class="entire-container">
    <div
      class="rectangle"
      id="rectangle">
      <layout-header
        :title="pageTitle"
        show-btn />
      <LoanCardDetails />
    </div>
    <div class="index-body-container">
      <van-grid :column-num="3">
        <van-grid-item
          v-for="feature in features"
          :key="feature.text"
          :icon="feature.icon"
          :text="feature.text" />
      </van-grid>
    </div>
  </div>
  <!-- <layout-footer :msg-num="msgNum" /> -->
</template>

<script setup lang="ts">
import { ref } from "vue";
import LayoutHeader from "@/Layout/LayoutHeader/index.vue";
import LayoutFooter from "@/Layout/LayoutFooter/index.vue";
import LoanCardDetails from "@/components/LoanDetails.vue"

// 반응형 데이터
const pageTitle = '대출 상세페이지';
const msgNum = 10;
const features = ref([
  { icon: 'photo-o', text: '기능1' },
  { icon: 'photo-o', text: '기능2' },
  { icon: 'photo-o', text: '기능3' },
  { icon: 'photo-o', text: '기능4' },
  { icon: 'photo-o', text: '기능5' },
  { icon: 'photo-o', text: '기능6' },
  { icon: 'photo-o', text: '기능7' },
  { icon: 'photo-o', text: '기능8' },
  { icon: 'photo-o', text: '기능9' },
  { icon: 'photo-o', text: '기능10' },
  { icon: 'photo-o', text: '기능11' },
  { icon: 'photo-o', text: '기능12' },
  { icon: 'photo-o', text: '기능13' },
  { icon: 'photo-o', text: '기능14' },
  { icon: 'photo-o', text: '기능15' },
  { icon: 'photo-o', text: '기능16' },
  { icon: 'photo-o', text: '기능17' },
  { icon: 'photo-o', text: '기능18' },
  { icon: 'photo-o', text: '기능19' },
  { icon: 'photo-o', text: '기능20' },
  { icon: 'photo-o', text: '기능21' },
  { icon: 'photo-o', text: '기능22' },
  { icon: 'photo-o', text: '기능23' },
  { icon: 'photo-o', text: '기능24' },
  { icon: 'photo-o', text: '기능25' },
  { icon: 'photo-o', text: '기능26' },
  { icon: 'photo-o', text: '기능27' },
  { icon: 'photo-o', text: '기능28' },
  { icon: 'photo-o', text: '기능29' },
  { icon: 'photo-o', text: '기능30' },
  { icon: 'photo-o', text: '기능31' },
  { icon: 'photo-o', text: '기능32' },
  { icon: 'photo-o', text: '기능33' },
  { icon: 'photo-o', text: '기능34' },
  { icon: 'photo-o', text: '기능35' },
  { icon: 'photo-o', text: '기능36' },
  { icon: 'photo-o', text: '기능37' },
  { icon: 'photo-o', text: '기능38' },
  { icon: 'photo-o', text: '기능39' },
  { icon: 'photo-o', text: '기능40' },
  { icon: 'photo-o', text: '기능41' },
  { icon: 'photo-o', text: '기능42' },
  { icon: 'photo-o', text: '기능43' },
  { icon: 'photo-o', text: '기능44' },
  { icon: 'photo-o', text: '기능45' },
  // 더 많은 기능 아이템 추가 가능
]);
window.addEventListener('scroll', function() {
  const el_blue = "#3C86FA"
  const el_white = "#FFFFFF"

  let el_rectangle = document.getElementById('rectangle');
  let el_card = document.getElementById('card-container')
  let el_header = document.getElementById('header-container')
  let scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // 스크롤 위치에 따라 배경색 변경
  if (scrollPosition > 16) { // 스크롤 위치가 50px을 초과하면 색상 변경
    el_rectangle.style.backgroundColor = el_white; // 변경할 배경색
    el_rectangle.style.borderRadius = "0";
    el_card.style.display = "none";
    el_header.style.position = "fixed";
    el_header.style.display = "flex";
    el_header.style.width = "100%";
    el_header.style.top = "0";
    el_header.style.zIndex = "1";
    el_header.style.backgroundColor = el_white;
  } else {
    el_rectangle.style.backgroundColor = el_blue; // 초기 배경색
    el_rectangle.style.borderRadius = "0 0 16px 16px";
    el_card.style.display = "flex";
    el_header.style.position = "inherit";
    el_header.style.zIndex = "0";
    el_header.style.backgroundColor = el_blue;
  }
})
</script>

<style lang="scss" scoped>
.entire-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .rectangle {
    background-color: #3C86FA;
    border-radius: 0 0 16px 16px;
    max-width: 480px;
    transition: background-color 0.5s ease-in-out;
    .card-container { //LoanDetails.vue
      display: flex;
      justify-content: center;
    }
  }
}
.index-body-container {
  margin: 1px;
  background: #e8e8ed;
  :deep() .van-grid-item__content:focus {
    background-color: #ccc;
  }
}
</style>
