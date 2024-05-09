<template>
  <div class="nav-bar">
    <!-- 뒤로가기 없는 navbar -->
    <div v-if="navBarFlag == '1_0'" class="nav-bar-1_0">
      <p>{{ title }}</p>
    </div>
    <!-- 뒤로가기 있는 navbar -->
    <div v-if="navBarFlag == '1_1'" class="nav-bar-1_1">
      <p>{{ title }}</p>
    </div>
    <!-- 홈화면 탭 있는 navbar -->
    <nav v-if="nav2_split == '2'" :class="navComputed">
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
</template>

<script setup>
  import { ref, onMounted, computed, watchEffect } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from "@/store/index";
  const router = useRouter();
  const store = useStore();
  const title = ref('해방의 날');
  const navBarFlag = ref(''); 
  const nav2_split = ref(''); // 대출, 통계, 설정 화면 NavBar
  const currentTab = ref('loan'); // 초기화면 대출 탭
  const tabIndex = ref(0);
  const emit = defineEmits(['response']);
  watchEffect(() => {
    emit('response', tabIndex.value); //HomePage.vue에 tabIndex 전달
  });
  /**
   * onMounted
   */
  onMounted(() => {
    navBarFlag.value = store.navBarFlag;
    nav2_split.value = navBarFlag.value.split('_')[0]; // 대출, 통계, 설정 화면 NavBar
  });
  
  /**
   * computed
   * 대출, 통계, 설정 화면 NavBar
   */
  const navComputed = computed(() => {
    if (navBarFlag.value === '2_1'){
      console.log('navBarFlag: 2_1 입니다.');
      return 'nav-bar-2_1';
    }
    if (navBarFlag.value === '2_2'){
      console.log('navBarFlag: 2_2 입니다.');
      return 'nav-bar-2_2';
    }
    if (navBarFlag.value === '2_3'){
      console.log('navBarFlag: 2_3 입니다.');
      return 'nav-bar-2_3';
    }
  });
  console.log(navBarFlag.value);

  // 탭을 설정하고 해당 인덱스를 스토어에 저장하는 함수
  function setTab(tabName, _tabIndex) {
    currentTab.value = tabName; // 탭 변경
    tabIndex.value = _tabIndex;
    // store.setTabIndex(tabIndex); // 스토어의 tabIndex 변경
    // console.log(currentTab.value);
    return currentTab.value;
  }
</script>

<style lang="scss" scoped>
  @media screen and (min-width: 1500px){
    .nav-bar{
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
        // > p{
        //   margin-left: 18px;
        // }
      }
      &-2_1{
        display: flex;
        > div:nth-child(1){
          // margin-left: 16px;
          > p{
            cursor:pointer ;
            font-size: 20px;
            font-family: 'NanumSquareNeo_extrabold';
          }
        }
        > div:nth-child(2){
          // margin-left: 16px;
          > p{
            cursor: pointer;
            font-size: 20px;
            font-family: 'NanumSquareNeo_extrabold';
            // color: #BDC0C6;
          }
        }
        > div:nth-child(3){
          // margin-left: 16px;
          > p{
            cursor: pointer;
            font-size: 20px;
            font-family: 'NanumSquareNeo_extrabold';
            // color: #BDC0C6;
          }
        }
      }
    }
  }

  .nav-bar{
    position: fixed;
    display: flex;
    align-items: center;
    top: 0;
    width: 100vw;
    height: 56px;
    background-color: #fff;
    &-1_0{
      font-size: 20px;
      font-family: "NanumSquareNeo_extrabold";
      > p{
        margin-left: 18px;
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
  }

  .hasdata-navbar__inactivetab{
    color: #BDC0C6;
  }
</style>