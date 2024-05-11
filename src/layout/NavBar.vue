<template>
  <div class="nav-bar" 
      :class="{ 'expanded': isExpanded, 'collapsed': !isExpanded }" 
      @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd"
      >
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
              <p>28,000,000원</p>
            </div>
            <div class="vertical-lines"></div>
            <div class="statistics-hidden-card__total-repay">
              <p>총 상환 원금</p>
              <p>28,000,000원</p>
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
  import { ref, onMounted, computed, watchEffect, watch } from 'vue';
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
  const isExpanded = ref(false);
  let touchStartY = 0;
  const navBarDisabled = ref(false);  // nav-bar 비활성화 상태
  const themeColor = ref("#ffffff");

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
    console.log('navBarFlag: ', navBarFlag.value);
    nav2_split.value = navBarFlag.value.split('_')[0]; // 대출, 통계, 설정 화면 NavBar
    
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
      document.body.style.overflow = '';
      console.log('navBarFlag: 2_1 입니다.');
      return 'nav-bar-2_1';
    }
    else if (tabIndex.value === 1){
      themeColor.value = '#3C86FA';
      navBarDisabled.value = false;
      isExpanded.value = true; // 통계 탭은 확장된 상태로 시작
      document.body.style.overflow = '';
      console.log('navBarFlag: 2_2 입니다.');
      return 'nav-bar-2_2';
    }
    else if (tabIndex.value === 2){
      themeColor.value = '#ffffff';
      navBarDisabled.value = true;
      isExpanded.value = false;
      document.body.style.overflow = '';
      console.log('navBarFlag: 2_3 입니다.');
      return 'nav-bar-2_3';
    }
  });

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
    if (navBarDisabled.value) {return};
    touchStartY = event.touches[0].clientY;
    document.body.style.overflow = 'hidden';  // 스크롤 잠금
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
    // 0.2초 후에 스크롤 잠금 해제
    setTimeout(() => {
      document.body.style.overflow = '';  // 스크롤 잠금 해제
    }, 340);
  };

  const handleTouchEnd = () => {
    if (navBarDisabled.value) {return};
    touchStartY = 0;
    // document.body.style.overflow = '';  // 스크롤 잠금 해제
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
  }
  // 축소된 상태
  // TODO: 대출, 설정 글꼴 색상 #2C62B8
  .nav-bar.collapsed {
    height: 56px;
    transition: height 0.2s ease;
  }
  // 확장된 상태
  .nav-bar.expanded {
    width: 100%;
    height: 200px;
    transition: height 0.2s ease;
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

</style>