import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      // 탭 인덱스 상태 추가
      tabIndex: 0
    }
  },
  mutations: {
    // 탭 인덱스 변경을 위한 mutation 추가
    setTabIndex(state, index) {
      state.tabIndex = index;
    }
  }
})

export default store;
