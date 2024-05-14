<template>
  <div>
    <div v-if="hasData" :class="hasData">
      <div class="has-data-navbar" :class=" isExpanded ? nav_bar_height : none ">
        <nav_bar @response="handleResponse" :totalPrincipal="totalPrincipal" :totalPrincipalRepayment="totalPrincipalRepayment"/>
      </div>
      <div class="has-data-view">
        <!-- TODO: 대출 통계 설정탭 -->
        <div v-if="isLoantabActivate" class="has-data-view-fragment">
          <f_loan :msg="tabIndex" />
        </div>
        <div v-if="isStatisticstabActivate">
          <f_loanStatistics @response="handleResponseStatistics" :msg="tabIndex" :isExpanded="isExpanded"/>
        </div>
        <div v-if="isSettingstabActivate">
          <f_settings :msg="tabIndex"/>
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
    </div>
    <button 
      @click="insertLoan" 
      class="empty-container-call-to-action__button"
      >
      <img src="/src/assets/ic_call_to_action.png" alt="대출추가" />
    </button>
    
  </div>
  <!-- <button type="button" v-on:click="clickTest()">test</button> -->
</template>

<script setup>
import { useStore } from "@/store/index";
import { ref, onMounted, computed, watch} from "vue";
import { getUserLoanInfo } from "@/api/loan.js";
import { useRouter } from 'vue-router';
import nav_bar from "@/layout/NavBar.vue";
import f_loan from '@/views/fragments/F_Loan.vue';
import f_loanStatistics from '@/views/fragments/F_LoanStatistics.vue';
import f_settings from '@/views/fragments/F_Settings.vue';
// import view_home from "@/components/ViewHome.vue";
// import bar_nav_loan from "@/components/BarNavigation.vue";

const router = useRouter();
const store = useStore();

const nav_bar_height = ref('has-data-navbar-height');
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
const isExpanded = ref(false);
const totalPrincipal = ref('');
const totalPrincipalRepayment = ref('');

// navBar에서 emit으로 받음
const handleResponse = ({ _tabIndex, _isExpanded }) => {
  // console.log(_tabIndex, _isExpanded);
  tabIndex.value = _tabIndex;
  isExpanded.value = _isExpanded;
};

const handleResponseStatistics = ({ _totalPrincipal, _totalPrincipalRepayment }) => {
  // console.log('totalPrincipal: ',_totalPrincipal, 'total repay',_totalPrincipalRepayment);
  totalPrincipal.value = _totalPrincipal.toLocaleString();
  totalPrincipalRepayment.value = _totalPrincipalRepayment.toLocaleString();
};

const isLoantabActivate = ref(true); //대출탭 활성화(기본값)
const isStatisticstabActivate = ref(false); //통계탭 활성화
const isSettingstabActivate = ref(false); //설정탭 활성화
// const isBlueNavActivate = ref(true); //네비게이션바 활성화(기본값)

watch(tabIndex, (newValue) => {
  // 각 탭의 활성화 상태를 배열로 관리
  const tabActivation = [isLoantabActivate, isStatisticstabActivate, isSettingstabActivate];

  // 모든 탭을 비활성화
  tabActivation.forEach(tab => tab.value = false);

  // 선택된 탭만 활성화
  tabActivation[newValue].value = true;

  // Perform any actions based on the new tab index value
});

// 컴포넌트가 마운트되었을 때 데이터를 불러오는 함수를 호출합니다.
  onMounted(async () => {
    try{
      if(store.nickName === ''){
        router.push('/');
      }
      const response = await getUserLoanInfo();
      loanCount.value = response.response.loanCount;
      if(hasData.value){
        store.navBarFlag = '2_1';
      }else{
        store.navBarFlag = '1_0';
      }
    }catch(e){
      console.log(e);
    }
  });
  function insertLoan(){
    store.navBarFlag = '1_1';
    router.push('/loan/create');
  } 
</script>
<!-- TODO: 대출목적별 컬러구분, 대출카드 클릭 이벤트, 폰트사이즈 18px 및 금액사이즈 조정, 
            1%라도 있는 경우 progress bar 15% 기본 유지            
-->
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
.has-data-navbar{
  width: 100vw;
  height: 56px;
  &-height{
    height: 200px;
  }
}

// hsdata
.has-data{
  // margin-top: 100px;
  &-view{
    width: 100vw;
    height: 100vh;
  }
}
</style>
