<template>
  <!-- Nav Bar on the Home screen -->
  <nav>
    <button
    :class="{ 'hasdata-navbar__inactivetab': currentTab !== 'loan' }"
    @click="setTab('loan', 0)"
    >
      대출
    </button>
    <button
      :class="{'hasdata-navbar__inactivetab': currentTab !== 'statistics'}"
      @click="setTab('statistics', 1)"
    >
      통계
    </button>
    <button
      :class="{
        'hasdata-navbar__inactivetab': currentTab !== 'settings',
      }"
      @click="setTab('settings', 2)"
    >
      설정
    </button>
  </nav>
  <btn_round_settings />
</template>

<script setup>
  import { useStore } from '@/store/index.ts';
  import { ref } from "vue";
  import Btn_round_settings from '@/components/BtnRoundSettings.vue';
  const currentTab = ref('loan'); // 초기화면 대출 탭
  const store = useStore();

  // 탭을 설정하고 해당 인덱스를 스토어에 저장하는 함수
  function setTab(tabName, tabIndex) {
    currentTab.value = tabName; // 탭 변경
    store.setTabIndex(tabIndex); // 스토어의 tabIndex 변경
    return currentTab.value;
  }
</script>

<style lang="scss" scoped>
  nav{
    width: 320px;
  }
  
</style>