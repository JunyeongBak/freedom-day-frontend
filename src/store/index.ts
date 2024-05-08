// Pinia를 사용하여 스토어 정의
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    // 탭 인덱스 상태
    navBarFlag: '',
    formData:{
      step1:{
        email_beginning: '',
        email_back: '',
        password: ''
      },
      step2:{
        nickname:''
      }
    },
    nickName: '',
    userData: {
      previousMonthPayment: 0,
      repaymentRate: 0,
      loanCount: 0,
      loanSimpleDtoList: []
    },
  }),
  actions: {
    // 탭 인덱스 변경을 위한 액션 추가
    setNavBarFlag(flag) {
      this.navBarFlag = flag;
    },
    saveStep1Data(email_beginning, email_back, password){
      this.formData.step1.email_beginning = email_beginning;
      this.formData.step1.email_back = email_back;
      this.formData.step1.password = password;
    },
    saveNickName(nickName){
      this.nickName = nickName;
    },
    saveUserHome(userData){
      this.userData.previousMonthPayment = userData.previousMonthPayment;
      this.userData.repaymentRate = userData.repaymentRate;
      this.userData.loanCount = userData.loanCount;
      this.userData.loanSimpleDtoList = userData.loanSimpleDtoList;
    },
  }
})
