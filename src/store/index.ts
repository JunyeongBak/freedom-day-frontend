// Pinia를 사용하여 스토어 정의
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    // 탭 인덱스 상태
    tabIndex: 0,
    formData:{
      step1:{
        email_beginning: '',
        email_back: '',
        password: ''
      },
      step2:{
        nickname:''
      }
    }
  }),
  actions: {
    // 탭 인덱스 변경을 위한 액션 추가
    setTabIndex(index) {
      this.tabIndex = index;
    },
    saveStep1Data(email_beginning, email_back, password){
      this.formData.step1.email_beginning = email_beginning;
      this.formData.step1.email_back = email_back;
      this.formData.step1.password = password;
    }
  }
})
