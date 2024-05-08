<template>
  <div>
    <!-- START] API data read successfully -->
    <div v-if="hasData" :class="vb_hasData">
      <div :class="vb_hasdataNavbar">
        <nav_bar />
      </div>
      <view_home />
    </div>
    <!-- END] API data read successfully -->
    <!-- START] Failed to read API data -->
    <div v-else :class="vb_empty">
      <nav_bar />
      <!-- <div :class="vb_emptyNavbar">
        <p>해방의 날</p>
      </div> -->
      <div :class="vb_emptyContainer">
        <p>해방의 날은</p>
        <p>처음 오셨네요?!</p>
        <div class="empty-container-img">
          <img src="@/assets/ic_haebang.png" alt="해방이" />
        </div>
        <p>해방이와 함께</p>
        <p>계획적인 빚테크 시작해 볼까요?</p>
      </div>
      <div>
        <!-- <p>대출 입력하고</p> -->
        <!-- <p>시작하기</p> -->
        <img src="/src/assets/call_to_action_label.png" alt="대출추가" @click = "" />
      </div>
      <button @click="" :class="vb_callToAction">
        <img src="/src/assets/ic_call_to_action.png" alt="대출추가" @click = "" />
      </button>
    </div>
    <!-- END] Failed to read API data -->
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store/index";
import { ref, onMounted, computed } from "vue";
import bar_nav_loan from "@/components/BarNavigation.vue";
import view_home from "@/components/ViewHome.vue";
// import { getUserLoanInfo } from "@/api/loan.js";
import nav_bar from "@/layout/NavBar.vue";
import { useRouter } from 'vue-router'

const router = useRouter();
const store = useStore();

const vb_empty = ref("empty");
const vb_emptyNavbar = ref("empty-navbar");
const vb_emptyContainer = ref("empty-container");
const hasData = computed(() => loanCount.value > 0);
// const currentTab = ref("home"); // 탭 기능 구현
const vb_hasdataNavbar = ref("hasdata-navbar");
// const vb_hasdataNavbar = computed(() =>
//   store.tabIndex === 1 ? "hasdata-navbar__blue" : "hasdata-navbar"
// );
const vb_hasData = ref("hasdata");
const vb_hasdataNavbarSettings = ref("hasdata-navbar__settings");
const vb_callToAction = ref("call-to-action");
let loanCount = ref(0); //API 데이터 유무 확인
// const props = defineProps({
//   dataLength: Number,
// });

// 컴포넌트가 마운트되었을 때 데이터를 불러오는 함수를 호출합니다.
onMounted(async () => {
  try {
    loanCount.value = store.userData.loanCount; //대출개수
  } catch (error) {

    console.log(error);
  }
});
</script>

<style lang="scss" scoped>
// 데이터가 없는 경우.
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: orange;
  &-navbar{
    display: flex;
    align-items: center;
    background-color: #FFF;
    height: 56px;
    > p {
      font-family: "NanumSquareNeo_extrabold";
      font-size: 20px;
      margin-left: 18px;
    }
  }
  &-container{
    margin-top: 80px;
    background-color: #FFF;
    width: 330px;
  }
}
// hsdata
.hasdata-navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  // width: 100%;
  // min-width: 348px;
  // min-height: 56px;
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
