// Pinia를 사용하여 스토어 정의
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    // 탭 인덱스 상태
    tabIndex: 0,
  }),
  actions: {
    // 탭 인덱스 변경을 위한 액션 추가
    setTabIndex(index) {
      this.tabIndex = index;
    }
  }
})
