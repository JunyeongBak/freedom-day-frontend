<template>
  <div>
    <!-- START] API data read successfully -->
    <div v-if="true" :class="vb_hasData">
      <div :class="vb_hasdataNavbar">
        <bar_nav_loan />
      </div>
      <view_home />
    </div>
    <!-- END] API data read successfully -->
    <!-- START] Failed to read API data -->
    <div v-else :class="vb_empty">
      <div :class="vb_emptyNavbar"><span>해방의 날</span></div>
      <div :class="vb_emptyContainer">
        <span>해방의 날은</span>
        <span>처음 오셨네요?!</span>
        <div>
          <svg
            width="140"
            height="140"
            viewBox="0 0 140 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_1053_1649)">
              <circle cx="70" cy="67" r="60" fill="#F3F3F3" />
              <path
                d="M80.6976 40.8516C85.0304 31.5745 93.1517 25.3325 105 27C98.1674 40.4289 101.2 57.1659 102.5 64.5025C108.266 97.0418 92.5165 112.003 60 112.003C37.5 112.003 25 98.1516 25 81.0655C25 63.9793 39.0947 50.1294 56.4815 50.1294C68.1506 50.1294 76.3647 50.1287 80.6976 40.8516Z"
                fill="url(#paint0_linear_1053_1649)"
              />
              <circle cx="45" cy="72" r="5" fill="white" />
              <circle cx="69.9999" cy="72" r="5" fill="white" />
              <path
                d="M70.0001 84.5001C70.0001 87.2615 64.4036 92.0001 57.5001 92.0001C50.5965 92.0001 45.0001 87.2615 45.0001 84.5001"
                stroke="white"
                stroke-width="2.43243"
                stroke-linecap="round"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_1053_1649"
                x="0"
                y="0"
                width="140"
                height="140"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="3" />
                <feGaussianBlur stdDeviation="5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_1053_1649"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_1053_1649"
                  result="shape"
                />
              </filter>
              <linearGradient
                id="paint0_linear_1053_1649"
                x1="105"
                y1="69.367"
                x2="25"
                y2="69.367"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#2B66F5" />
                <stop offset="1" stop-color="#4BA6FE" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span>해방이와 함께</span>
        <span>계획적인 빚테크 시작해 볼까요?</span>
      </div>
      <button @click="" :class="vb_callToAction">
        <img src="/src/assets/call_to_action.svg" alt="Button Icon" />
      </button>
    </div>
    <!-- END] Failed to read API data -->
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store/index";
import { ref, onMounted, computed, defineProps } from "vue";
import bar_nav_loan from "@/components/BarNavigation.vue";
import view_home from "@/components/ViewHome.vue";

const vb_empty = ref("empty");
const vb_emptyNavbar = ref("empty-navbar");
const vb_emptyContainer = ref("empty-container");
// const hasData = computed(() => dataLength.value == 0);
// const currentTab = ref("home"); // 탭 기능 구현
const vb_hasdataNavbar = computed(() =>
  store.tabIndex === 1 ? "hasdata-navbar__blue" : "hasdata-navbar"
);
const vb_hasData = ref("hasdata");
const vb_hasdataNavbarSettings = ref("hasdata-navbar__settings");
const vb_callToAction = ref("call-to-action");
let dataLength = ref(0); //API 데이터 유무 확인
const props = defineProps({
  dataLength: Number,
});

// 컴포넌트가 마운트되었을 때 데이터를 불러오는 함수를 호출합니다.
onMounted(async () => {
  try {
    // const response = await fetch('https://www.freedom-day.site/api/test/user-loan-info');
    const response = await fetch("");
    const fetchedData = await response.json();
    dataLength.value = fetchedData["response"]["loanCount"];
    console.log(dataLength);
  } catch (error) {
    console.error("Error fetching data:", error);
    dataLength = ref(0);
  }
});
const store = useStore();
</script>

<style lang="scss">
// 데이터가 없는 경우.
.empty {
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 360px;
  min-height: 800px;
  align-items: center;
  background-color: #f3f3f3;

  &-navbar {
    display: flex;
    width: 100%;
    min-width: 360px;
    min-height: 56px;
    top: 0px;
    align-items: center;
    padding-left: 18px;
    background-color: #ffffff;
    font-family: "NanumSquareNeo_extrabold";
    font-weight: 800;
    font-size: 20px;
  }

  &-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    min-width: 329px;
    min-height: 374px;
    font-size: 20px;
    font-weight: 700;
    background-color: #fff;
    border-radius: 16px;
    font-family: "NanumSquareNeo_normal";
    font-weight: 700;
    font-size: 20px;

    div > svg {
      margin-top: 24px;
      margin-bottom: 24px;
    }
  }
  .call-to-action {
    position: absolute;
    right: 16px;
    bottom: 34px;
    min-width: 46px;
    min-height: 46px;
    background: transparent;
    border-color: transparent;
  }
}
// hsdata
.hasdata-navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 348px;
  min-height: 56px;
  font-family: "NanumSquareNeo_extrabold";
  font-size: 20px;
  background-color: #ffffff;

  &__inactivetab {
    color: #bdc0c6;
    // margin: 16px;
  }

  > a {
    margin-left: 16px;
  }

  > nav > button {
    background: #ffffff;
    // color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    margin-left: 16px;
  }

  &__settings {
    position: absolute;
    top: 12px;
    right: 15px;
    background-color: #fff;
    width: 57px;
    height: 32px;
    border: solid 1px #d0d3dd;
    border-radius: 40px;
    box-sizing: border-box;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
  }
}
</style>
