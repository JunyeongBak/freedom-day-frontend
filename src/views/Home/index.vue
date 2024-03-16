<template>
  <div>
    <div v-if="hasData">
      test
    </div>
    <div
      v-else
      class="empty">
      <div class="empty-navbar"><span>해방의 날</span></div>
      <div class="empty-container">
        <span>해방의 날은</span>
        <span>처음 오셨네요?!</span>
        <div>
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_1053_1649)">
            <circle cx="70" cy="67" r="60" fill="#F3F3F3"/>
            <path d="M80.6976 40.8516C85.0304 31.5745 93.1517 25.3325 105 27C98.1674 40.4289 101.2 57.1659 102.5 64.5025C108.266 97.0418 92.5165 112.003 60 112.003C37.5 112.003 25 98.1516 25 81.0655C25 63.9793 39.0947 50.1294 56.4815 50.1294C68.1506 50.1294 76.3647 50.1287 80.6976 40.8516Z" fill="url(#paint0_linear_1053_1649)"/>
            <circle cx="45" cy="72" r="5" fill="white"/>
            <circle cx="69.9999" cy="72" r="5" fill="white"/>
            <path d="M70.0001 84.5001C70.0001 87.2615 64.4036 92.0001 57.5001 92.0001C50.5965 92.0001 45.0001 87.2615 45.0001 84.5001" stroke="white" stroke-width="2.43243" stroke-linecap="round"/>
            </g>
            <defs>
            <filter id="filter0_d_1053_1649" x="0" y="0" width="140" height="140" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="3"/>
            <feGaussianBlur stdDeviation="5"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1053_1649"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1053_1649" result="shape"/>
            </filter>
            <linearGradient id="paint0_linear_1053_1649" x1="105" y1="69.367" x2="25" y2="69.367" gradientUnits="userSpaceOnUse">
            <stop stop-color="#2B66F5"/>
            <stop offset="1" stop-color="#4BA6FE"/>
            </linearGradient>
            </defs>
          </svg>
        </div>
        <span>해방이와 함께</span>
        <span>계획적인 빚테크 시작해 볼까요?</span>
      </div>
      <button class="call-to-action">
        <img src="/home/tory/side/DEMO/freedom-day-frontend/src/assets/call_to_action.svg" alt="Button Icon">
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue';

  let dataLength = ref(0)

  // 데이터 배열에 내용이 있는지 확인하는 computed 속성을 생성합니다.
  const hasData = computed(() => dataLength.value > 0);

  // 컴포넌트가 마운트되었을 때 데이터를 불러오는 함수를 호출합니다.
  onMounted(async () => {
    try {
      // const response = await fetch('https://www.freedom-day.site/api/test/graph1');
      const response = await fetch('');
      const fetchedData = await response.json();
      dataLength.value = fetchedData['response'].length
      console.log(dataLength.value)
    } catch (error) {
      console.error('Error fetching data:', error);
      dataLength = ref(0)
    }
  });
</script>

<style lang="scss" scoped>
  .empty {
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 360px;
    min-height: 800px;
    align-items: center;
    background-color: #F3F3F3;
    
    &-navbar{
      display: flex;
      width: 100%;
      min-width: 360px;
      min-height: 56px;
      top:0px;
      align-items: center;
      padding-left: 18px;
      background-color: #FFF;
      font-family: 'NanumSquareNeo_extrabold';
      font-weight: 800;
      font-size: 20px;
    }
    
    &-container{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 24px;
      min-width: 329px;
      min-height: 374px;
      font-size: 20px;
      font-weight: 700;
      background-color: #FFF;
      border-radius: 16px;
      font-family: 'NanumSquareNeo_normal';
      font-weight: 700;
      font-size: 20px;

      div > svg{
        margin-top: 24px;
        margin-bottom: 24px;
      }
    }

    .call-to-action{
      position: absolute;
      right: 16px;
      bottom: 34px;
      min-width: 46px;
      min-height: 46px;
      background: transparent;
      border-color: transparent;
    }
  }
</style>
