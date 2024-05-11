<template>
  <div class="nav-bar" :style="{ height: `${navBarHeight}px`}" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
    {{ navBarHeight }}
    <!-- 뒤로가기 없는 navbar -->
    <div v-if="navBarFlag == '1_0'" class="nav-bar-1_0">
      <p>{{ title }}</p>
    </div>
    <!-- 뒤로가기 있는 navbar -->
    <div v-else-if="navBarFlag == '1_1'" class="nav-bar-1_1">
      <p>{{ title }}</p>
    </div>
    <!-- 홈화면 탭 있는 navbar -->
    <div v-else clss="nav-bar-2_2_container">
      <nav :class="navComputed">
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
    </div>
    <!-- <div v-if="true" class="nav-bar-blue-info">
      dd
    </div> -->
  </div>
</template>

<script setup>
  import { ref, onMounted, computed, watchEffect } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from "@/store/index.ts";
  const router = useRouter();
  const store = useStore();
  const title = ref('해방의 날');
  const navBarFlag = ref(''); 
  const nav2_split = ref(''); // 대출, 통계, 설정 화면 NavBar
  const currentTab = ref('loan'); // 초기화면 대출 탭
  const tabIndex = ref(0);
  const emit = defineEmits(['response']);
  const isNavBarBlue = ref(false);
  let navBarHeight = ref(56);  // 초기 nav-bar 높이
  let touchStartY = 0;
  watchEffect(() => {
    emit('response', tabIndex.value); //HomePage.vue에 tabIndex 전달
  });
  /**
   * onMounted
   */
  onMounted(() => {
    navBarFlag.value = store.navBarFlag; //TODO: 추후에 완전히 pinia 제거하기
    console.log('navBarFlag: ', navBarFlag.value);
    nav2_split.value = navBarFlag.value.split('_')[0]; // 대출, 통계, 설정 화면 NavBar
    
  });
  
  /**
   * computed
   * 대출, 통계, 설정 화면 NavBar
   */
  const navComputed = computed(() => {
    if (tabIndex.value === 0){
      console.log('navBarFlag: 2_1 입니다.');
      return 'nav-bar-2_1';
    }
    else if (tabIndex.value === 1){
      console.log('navBarFlag: 2_2 입니다.');
      return 'nav-bar-2_2';
    }
    else if (tabIndex.value === 2){
      console.log('navBarFlag: 2_3 입니다.');
      return 'nav-bar-2_3';
    }
  });
  // const navBarBlue = computed(() => {
  //   if (navBarFlag.value === '2_2' && isNavBarBlue.value === true){
  //   console.log('blue');
  //   return 'nav-bar-2_2_blue';
  //   }else{
  //     console.log('white');
  //     return null;
  //   }
  // });
  console.log(navBarFlag.value);

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
    touchStartY = event.touches[0].clientY;
    document.body.style.overflow = 'hidden';  // 스크롤 잠금
  };

  const handleTouchMove = (event) => {
    const touchEndY = event.touches[0].clientY;
    const diffY = touchEndY - touchStartY;

    if (diffY > 0) {  // 아래로 스와이프
      navBarHeight.value = Math.min(200, navBarHeight.value + diffY);  // 최대 높이 100px
    } else {  // 위로 스와이프
      navBarHeight.value = Math.max(54, navBarHeight.value + diffY);  // 최소 높이 56px
    }
  };

  const handleTouchEnd = () => {
    touchStartY = 0;
  };

</script>

<style lang="scss" scoped>
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
      // background-color: #2C62B8;
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
    &-2_2_blue{
        width: 100vw;
        height: 56px;
        background-color:#FFF;
        transition: height 0.3s ease;
      }
  }


  .nav-bar-blue-info{
    width: 100%;
    height: 56px;
    background-color:#3C86FA;
  }
  .hasdata-navbar__inactivetab{
    color: #BDC0C6;
  }

</style>