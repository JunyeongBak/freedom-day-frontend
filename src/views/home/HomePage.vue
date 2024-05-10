<template>
  <div>
    <div v-if="hasData" :class="hasData">
      <div class="has-data-navbar">
        <nav_bar @response="(msg) => tabIndex = msg"/>
      </div>
      <div class="has-data-view">
        <div v-if="true" class="has-data-view-fragment">
          <f_loan :msg="tabIndex" />
          <!-- {{ tabIndex }} -->
        </div>
      </div>
    </div>
    <div v-else :class="vb_empty">
      <nav_bar />
      <div :class="vb_emptyContainer">
        <p>해방의 날은</p>
        <p>처음 오셨네요?!</p>
        <div class="empty-container-img">
          <img src="@/assets/ic_haebang.png" alt="해방이" />
        </div>
        <p>해방이와 함께</p>
        <p>계획적인 빚테크 시작해 볼까요?</p>
      </div>
      <div class="empty-container-call-to-action__label">
        <img src="/src/assets/call_to_action_label.png" alt="라벨" @click = "" />
      </div>
      <button @click="" class="empty-container-call-to-action__button">
        <img src="/src/assets/ic_call_to_action.png" alt="대출추가" @click = "" />
      </button>
    </div>
    
  </div>
  <!-- <button type="button" v-on:click="clickTest()">test</button> -->
</template>

<script setup>
import { useStore } from "@/store/index";
import { ref, onMounted, computed, watch} from "vue";
import bar_nav_loan from "@/components/BarNavigation.vue";
import view_home from "@/components/ViewHome.vue";
import { getUserLoanInfo } from "@/api/loan.js";
import nav_bar from "@/layout/NavBar.vue";
import { useRouter } from 'vue-router'
import f_loan from '@/views/fragments/F_Loan.vue';

const router = useRouter();
const store = useStore();

const vb_empty = ref("empty");
const vb_emptyNavbar = ref("empty-navbar");
const vb_emptyContainer = ref("empty-container");
const hasData = computed(() => loanCount.value > 0);
const vb_hasdataNavbar = ref("hasdata-navbar");
const vb_hasData = ref("hasdata");
const vb_hasdataNavbarSettings = ref("hasdata-navbar__settings");
let loanCount = ref(0); //API 데이터 유무 확인
const allTab = ref(["loan", "statistics", "settings"]);
const tabIndex = ref(0);
watch(tabIndex, (newValue) => {
  console.log('New tab index:', newValue);
  // Perform any actions based on the new tab index value
});
// const whichTab = computed(() => tabIndex.value);
// 컴포넌트가 마운트되었을 때 데이터를 불러오는 함수를 호출합니다.
onMounted(async () => {
  try {
    const response = await getUserLoanInfo();
    console.log('****************', response.response.loanCount);
    loanCount.value = response.response.loanCount;

    if (hasData.value) {
      store.navBarFlag = "2_1";
    }else{
      store.navBarFlag = "1_0";
    }
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
  &-container{
    position: fixed;
    top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // margin-top: 80px;
    background-color: #FFF;
    width: 330px;
    height: 380px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    font-size: 20px;
    font-family: "NanumSquareNeo_bold";
    &-img{
      margin: 24px auto;
    }
    &-call-to-action__label{
      position: fixed;
      bottom: 100px;
      right: 30px;
    }
    &-call-to-action__button{
      position: fixed;
      bottom: 50px;
      right: 30px;
    }
  }
}
// hsdata
.has-data{
  // margin-top: 100px;
  &-view{
    width: 100vw;
    margin-top: 54px;
  }
}
</style>
