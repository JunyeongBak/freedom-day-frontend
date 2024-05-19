<template>
  <div class="nav-bar" 
      :class="{ 'expanded': isExpanded, 'collapsed': !isExpanded, 'expandedDetails' : isExpandedDetails }" 
      @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd"
      >
    <!-- {{ navBarHeight }} -->
    <!-- 뒤로가기 없는 navbar -->
    <div v-if="navBarFlag == '1_0'" class="nav-bar-1_0">
      <p>{{ title || $route.name }}</p>
    </div>
    <!-- 뒤로가기 있는 navbar -->
    <div v-else-if="navBarFlag == '1_1'" class="nav-bar-1_1" :class="{navDetailsComputed}">
      <div class="nav-bar-1_1__container">
        <img src="@/assets/ic_arrow_left.png" @click="goBack"/>
        <p>{{ title || $route.name }}</p>
      </div>
      <div v-if="isExpandedDetails" class="nav-bar-details">
        <div class="nav-bar-details__card">
          <div class="nav-bar-details__card-container">
            <img src="@/assets/ic_bank.png" class="nav-bar-details__card-container__img"/>
            <p class="nav-bar-details__card-container__name">{{ $route.query.name }}</p>
            <p class="nav-bar-details__card-container__purpose">{{ $route.query.purpose }}</p>
          </div>
          <div class="orient-line"></div>
          <p>상환 현황</p>
          <div class="nav-bar-details__card-total">
            <img src="@/assets/ic_haebang.png" style="width:24px; height:24px; margin-right: 8px;"/>
            <p>{{ store.nickName }}님! 대출이 {{ Number.parseInt($route.query.outstandingPrincipal).toLocaleString() }}원이 남았어요!</p>
            <div class="nav-bar-details__card-total-repaymentAmount">{{ Number.parseInt(repaymentAmount).toLocaleString() + "원" ||0 }}</div>
          </div>
          <div class="back-chart">
            <div class="progress-bar" :style="{ minWidth: '10%', width: Number.parseInt($route.query.paymentPercentage).toString() + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 홈화면 탭 있는 navbar -->
    <div v-else class="home-hidden-container">
      <nav :class="navComputed" :style="{ 'margin-bottom': isExpanded ? '55px' : '0' }">
        <div
        :class="{ 'hasdata-navbar__inactivetab': currentTab !== 'loan' }"
        @click="setTab('loan', 0)"
        >
          <p>대출</p>
        </div>
        <div
          :class="{'hasdata-navbar__inactivetab': currentTab !== 'statistics'}"
          @click="setTab('statistics', 1)"
        >
          <p>통계</p>
        </div>
        <div
          :class="{
            'hasdata-navbar__inactivetab': currentTab !== 'settings',
          }"
          @click="setTab('settings', 2)"
        >
          <p>설정</p>
        </div>
      </nav>
      <div v-if="isExpanded">
        <div class="statistics-hidden">
          <div class="statistics-hidden-card">
            <div class="statistics-hidden-card__total">
              <p>전체 대출 잔액</p>
              <p>{{totalPrincipal}}원</p>
            </div>
            <div class="vertical-lines"></div>
            <div class="statistics-hidden-card__total-repay">
              <p>총 상환 원금</p>
              <p>{{totalPrincipalRepayment}}원</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-if="true" class="nav-bar-blue-info">
      dd
    </div> -->
  </div>
</template>

<script setup>
  import { ref, onMounted, computed, watchEffect, watch, defineProps } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from "@/store/index.ts";
  // import { getLoanDetails } from '@/api/loan.js';
  const router = useRouter();
  const store = useStore();
  const title = ref('');
  const navBarFlag = ref(''); 
  const nav2_split = ref(''); // 대출, 통계, 설정 화면 NavBar
  const currentTab = ref('loan'); // 초기화면 대출 탭
  const tabIndex = ref(0);
  const emit = defineEmits(['response']);
  const isNavBarBlue = ref(false);
  const isExpanded = ref(false);
  const isExpandedDetails = ref(false);
  let touchStartY = 0;
  const navBarDisabled = ref(false);  // nav-bar 비활성화 상태
  const themeColor = ref("#ffffff");

  defineProps({
    totalPrincipal: String,
    totalPrincipalRepayment: String,
    repaymentAmount: Number,
  });

  watchEffect(() => {
    emit('response', {_tabIndex: tabIndex.value, _isExpanded: isExpanded.value}); //HomePage.vue에 tabIndex 전달
  });

    // 테마 색상이 변경될 때마다 메타 태그 업데이트
  watch(themeColor, (newColor) => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', newColor);
    } else {
      const metaTag = document.createElement('meta');
      metaTag.name = "theme-color";
      metaTag.content = newColor;
      document.getElementsByTagName('head')[0].appendChild(metaTag);
    }
  });
  /**
   * onMounted
   */
  onMounted(() => {
    navBarFlag.value = store.navBarFlag; //TODO: 추후에 완전히 pinia 제거하기
    // console.log(navBarFlag.value);
    // console.log('navBarFlag: ', navBarFlag.value);
    nav2_split.value = navBarFlag.value.split('_')[0]; // 대출, 통계, 설정 화면 NavBar
    // console.log(isExpandedDetails.value);
    // console.log(`repaymentAmount: ${repaymentAmount.value}`);
  });
  
  /**
   * computed
   * 대출, 통계, 설정 화면 NavBar
   */
  const navComputed = computed(() => {
    if (tabIndex.value === 0){
      themeColor.value = '#ffffff';
      navBarDisabled.value = true;
      isExpanded.value = false;
      document.body.style.backgroundColor = '#F3F3F3';
      document.body.style.overflow = '';
      // console.log('navBarFlag: 2_1 입니다.');
      return 'nav-bar-2_1';
    }
    else if (tabIndex.value === 1){
      themeColor.value = '#3C86FA';
      navBarDisabled.value = false;
      isExpanded.value = true; // 통계 탭은 확장된 상태로 시작
      document.body.style.backgroundColor = '#FFF';
      document.body.style.overflow = '';
      // console.log('navBarFlag: 2_2 입니다.');
      return 'nav-bar-2_2';
    }
    else if (tabIndex.value === 2){
      themeColor.value = '#ffffff';
      navBarDisabled.value = true;
      isExpanded.value = false;
      document.body.style.backgroundColor = '#F3F3F3';
      document.body.style.overflow = '';
      // console.log('navBarFlag: 2_3 입니다.');
      return 'nav-bar-2_3';
    }
  });

  const navDetailsComputed = computed(() =>{
    if(router.currentRoute.value.name === '대출 상세페이지'){
      isExpandedDetails.value = true; 
      document.body.style.backgroundColor = '#FFF';
    }
  })
  // console.log(navBarFlag.value);

  // 탭을 설정하고 해당 인덱스를 스토어에 저장하는 함수
  function setTab(tabName, _tabIndex) {
    currentTab.value = tabName; // 탭 변경
    tabIndex.value = _tabIndex;
    if (currentTab.value === 'statistics'){
      isNavBarBlue.value = true;
    }else{
      isNavBarBlue.value = false;
    }
    // store.setTabIndex(tabIndex); // 스토어의 tabIndex 변경
    // console.log(currentTab.value);
    return currentTab.value;
  }

  const handleTouchStart = (event) => {
    if (navBarDisabled.value) {return};
    touchStartY = event.touches[0].clientY;
    // document.body.style.overflow = 'hidden';  // 스크롤 잠금
  };

  const handleTouchMove = (event) => {
    if (navBarDisabled.value) {return};
    document.body.style.overflow = 'hidden';  // 스크롤 잠금
    const touchEndY = event.touches[0].clientY;
    const diffY = touchEndY - touchStartY;
    if (diffY > 0) {  // 아래로 스와이프
      isExpanded.value = true;
    } else {  // 위로 스와이프
      isExpanded.value = false;
    }
    // 0.3초 후에 스크롤 잠금 해제
    setTimeout(() => {
      document.body.style.overflow = '';  // 스크롤 잠금 해제
    }, 300);
  };

  const handleTouchEnd = () => {
    if (navBarDisabled.value) {return};
    touchStartY = 0;
    // document.body.style.overflow = '';  // 스크롤 잠금 해제
  };

  function goBack() {
    store.navBarFlag = '1_0';
    router.go(-1);
  }

</script>

<style lang="scss" scoped>
  @import "@/style/common.scss";
  // TODO: PC화면용 2024년 5월 16일 이후로 예정.
  @media screen and (min-width: 1500px){
    .nav-bar{
      z-index: 200;
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      width: 100%;
      height: 56px;
      background-color: #fff;
      &-1_0{
        font-size: 20px;
        font-family: "NanumSquareNeo_extrabold";
      }
      &-1_1{
        font-size: 20px;
        font-family: "NanumSquareNeo_extrabold";
      }
      &-2_1{
        display: flex;
        > div:nth-child(1){
          > p{
            cursor:pointer ;
            font-size: 20px;
            font-family: 'NanumSquareNeo_extrabold';
          }
        }
        > div:nth-child(2){
          > p{
            cursor: pointer;
            font-size: 20px;
            font-family: 'NanumSquareNeo_extrabold';
          }
        }
        > div:nth-child(3){
          > p{
            cursor: pointer;
            font-size: 20px;
            font-family: 'NanumSquareNeo_extrabold';
          }
        }
      }

    }
  }
  // 모바일 화면용
  .nav-bar{
    position: fixed;
    display: flex;
    z-index: 200;
    align-items: center;
    top: 0;
    width: 100vw;
    height: 56px;
    background-color: #fff;
    &-1_0{
      position: relative;
      z-index: 1;
      font-size: 20px;
      font-family: "NanumSquareNeo_extrabold";
      > p{
        margin-left: 18px;
      }
    }
    &-1_1{
        font-size: 20px;
        font-family: "NanumSquareNeo_extrabold";
        // margin-top: 20px;
        &__container{
          display: flex;
          justify-content: left;
          align-items: center;
          // margin-bottom: 40px;
        }
      }
    &-2_1{
      display: flex;
      > div:nth-child(1){
        margin-left: 16px;
        > p{
          cursor:pointer ;
          font-size: 20px;
          font-family: 'NanumSquareNeo_extrabold';
        }
      }
      > div:nth-child(2){
        margin-left: 16px;
        > p{
          cursor: pointer;
          font-size: 20px;
          font-family: 'NanumSquareNeo_extrabold';
        }
      }
      > div:nth-child(3){
        margin-left: 16px;
        > p{
          cursor: pointer;
          font-size: 20px;
          font-family: 'NanumSquareNeo_extrabold';
        }
      }
    }
    &-2_2{
      display: flex;
      > div:nth-child(1){
        margin-left: 16px;
        > p{
          cursor:pointer ;
          font-size: 20px;
          font-family: 'NanumSquareNeo_extrabold';
        }
      }
      > div:nth-child(2){
        margin-left: 16px;
        > p{
          cursor: pointer;
          font-size: 20px;
          font-family: 'NanumSquareNeo_extrabold';
        }
      }
      > div:nth-child(3){
        margin-left: 16px;
        > p{
          cursor: pointer;
          font-size: 20px;
          font-family: 'NanumSquareNeo_extrabold';
        }
      }
    }
    &-2_3{
      display: flex;
      > div:nth-child(1){
        margin-left: 16px;
        > p{
          cursor:pointer ;
          font-size: 20px;
          font-family: 'NanumSquareNeo_extrabold';
        }
      }
      > div:nth-child(2){
        margin-left: 16px;
        > p{
          cursor: pointer;
          font-size: 20px;
          font-family: 'NanumSquareNeo_extrabold';
        }
      }
      > div:nth-child(3){
        margin-left: 16px;
        > p{
          cursor: pointer;
          font-size: 20px;
          font-family: 'NanumSquareNeo_extrabold';
        }
      }
    }

    &-details{
      width: 328px;
      height: 230px;
      &__card{
        position: absolute;
        top: 80px;
        left: calc(50% - 164px);
        width: 328px;
        height: 190px;
        background: #FFFFFF;
        border: 1px solid #E4E4E4;
        box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
        border-radius: 16px;
        // margin: 48px 16px 0;
        > p{
          font-size: 14px;
          font-family: 'NanumSquareNeo_bold';
          margin: 8px auto 8px;
          padding: 0 16px 0;
        }
        &-total{
          display: flex;
          font-size: 12px;
          align-items: center;
          justify-content: center;
          position: relative;
          &-repaymentAmount{
            position: absolute;
            color: $grey00;
            font-size: 14px;
            line-height: 26px;
            bottom: -40px;
            z-index: 1001;
          }
        }
        &-container{
          position:relative;
          display: flex;
          justify-content: left;
          align-items: center;
          padding: 16px;
        }
        &-container__img{
          width: 48px;
          height: 48px;
          // margin: 16px 0 0 16px;
        }
        &-container__purpose{
          position:absolute;
          top: 16px;
          left:80px;
          text-align: center;
          line-height: 19px;
          display: inline-block;
          font-size: 12px;
          min-width: 50px;
          padding: 3px 6px;
          color: $grey00;
          height: 19px;
          font-family: 'NanumSquareNeo_bold';
          background: $grey80;
          border-radius: 999px;
        }
        &-container__name{
          position:absolute;
          top: 36px;
          left: 80px;
          font-size: 16px;
          font-family: 'NanumSquareNeo_bold';
          color: $grey100;
          margin-top: 8px;
        }
      }
    }
  }
  // 축소된 상태
  // TODO: 대출, 설정 글꼴 색상 #2C62B8
  .nav-bar.collapsed {
    height: 56px;
    transition: height 0.2s ease, background-color 0.2s linear;
  }
  // 확장된 상태
  .nav-bar.expanded {
    width: 100%;
    height: 200px;
    transition: height 0.2s ease, background-color 0.2s linear;
    background-color: #3C86FA;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0px 0px 16px 16px;
  }

  // .nav-bar.collapsedDetails{
  //   height: 56px;
  //   transition: height 0.2s ease, background-color 0.2s linear;
  // }

  .nav-bar.expandedDetails{
    width: 100%;
    height: 294px;
    transition: height 0.2s ease, background-color 0.2s linear;
    background-color: #3C86FA;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0px 0px 16px 16px;
  }


  .hasdata-navbar__inactivetab{
    color: #BDC0C6;
  }

  .home-hidden-container{
    width: 100vw;
  }
  .statistics-hidden{
    // position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90vw;
    height: 90px;
    margin-left: 18px;
    &-card{
      display: flex;
      justify-content:space-around;
      align-items:center;
      width: 100%;
      height: 100%;
      background-color: #fff;
      border: 1px solid #E4E4E4;
      border-radius: 16px;
      &__total{
        > p:nth-child(1){
          font-size: 16px;
          font-family: 'NanumSquareNeo_normal';
          color: #898F9A;
          margin-bottom: 8px;
        }
        > p:nth-child(2){
          font-size: 18px;
          font-family: 'NanumSquareNeo_heavy';
          color: #1D2532;
        }
      }
      &__total-repay{
        > p:nth-child(1){
          font-size: 16px;
          font-family: 'NanumSquareNeo_normal';
          color: #898F9A;
          margin-bottom: 8px;
        }
        > p:nth-child(2){
          font-size: 18px;
          font-family: 'NanumSquareNeo_heavy';
          color: #1D2532;
        }
      }
    }
  }
  .vertical-lines{
    position: absolute;
    width: 68px;
    height: 0px;
    border: 1px solid #F3F3F3;
    transform: rotate(90deg);
  }
  .chart-percent{
  color: #FFF;
  position: absolute;
  bottom: 0;
  left: 0px;
  z-index: 1;
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 26px;
  width: 100px;
  background: linear-gradient(270deg, #2B66F5 0%, #4BA6FE 100%);
  border-radius: 999px;
}

.back-chart{
  position: absolute;
  width: 297px;
  height: 26px;
  background: #DBDDE2;
  border-radius: 999px;
  bottom: 16px;
  left: 16px;
}
</style>