<template>
  <div class="sign-up">
    <div class="sign-up__navbar">
      <nav_bar />
    </div>
    <div class="sign-up-body">
      <div class="sign-up-body__welcome-container">
        <div style="width:104px; height:110px;">
          <img src="@/assets/ic_haebang_56.svg" alt="해방이 로고" />
        </div>
        <p class="sign-up-body__welcome-words">해방의 날에 오신 걸 환영해요!</p>
      </div>
      <form method="POST" @submit.prevent="handleSubmit" style="padding:0 16px 0;">
        <!-- START Email -->
        <div class="sign-up-body__email-label">
          <img src="@/assets/ic_star.svg" alt="필수" />
          <p>이메일</p>
          <van-icon 
            name="success" 
            class="sign-up-body__email-label__check"
            :style="{color: isEmailCheck ? '#2B66F5' : '#DBDDE2'}"
            />
        </div>
        <div class="sign-up-body__email-contents">
          <p style="position:absolute;top:46px;left:0px; color:red">{{ emailLocalError }}</p>
          <input
            type="text" 
            v-model="email" 

            @blur="validateAndAlert" 
            :disabled="isEmailCheck" 
            placeholder="이메일" />
          <span>@</span>
          <select 
            class="select-style" 
            :style="{color: selectedOption =='' ? '#BDC0C6' : '#1D2532'}" 
            v-model="selectedOption"
            :disabled="isEmailCheck"
            >
            <option value="" disabled selected hidden >선택</option>
            <option value="gmail.com" >gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="nate.com">nate.com</option>
            <option value="daum.net">daum.net</option>
            <option value="hanmail.net">hanmail.net</option>
            <option value="kakao.com">kakao.com</option>
          </select>
          <div 
            class="sign-up-body__email-contents__authentication"
            @click="toggleAuthenticate"
            :style="{background: isEmailCheck ? '#BDC0C6' : 'linear-gradient(315deg, #2B66F5 15.76%, #4BA6FE 84.24%)'}"
            >
            인증
          </div>
          <div v-if="showAuthPopup" class="overlay"></div>
          <div v-if="showAuthPopup" class="sign-up-auth-popup">
            <p>{{ email + '@' +selectedOption }}</p>
            <p>[인증 링크 발송 안내]</p>
            <p class="sign-up-auth-popup__label">입력하신 이메일 주소가 맞습니까?</p>
            <div class="sign-up-auth-popup__container">
              <button @click="emailAuthenticate" class="sign-up-auth-popup__yes">네</button>
              <button @click="toggleAuthenticate" class="sign-up-auth-popup__no">아니오</button>
            </div>
          </div>
        </div>
        <!-- END Email -->

        <!-- START Password -->
        <div class="sign-up-body__passwd-label">
          <img src="@/assets/ic_star.svg" alt="필수" />
          <p>비밀번호</p>
          <van-icon 
            name="success" 
            class="sign-up-body__email-label__check"
            :style="{color: isPasswordCheck ? '#2B66F5' : '#DBDDE2'}"
            />
        </div>
        <div class="sign-up-body__passwd-contents">
          <input 
            type="password" 
            v-model="password" 
            @input="validatePassword"
            @blur="validatePassword" 
            placeholder="영문+숫자+특수문자 포함 8~20자리" />
        </div>
        <!-- END Password -->

        <!-- START Password RE -->
        <div class="sign-up-body__passwd-label">
          <img src="@/assets/ic_star.svg" alt="필수" />
          <p>비밀번호 확인</p>
          <van-icon 
            name="success" 
            class="sign-up-body__email-label__check"
            :style="{color: ispasswordCheckAgain ? '#2B66F5' : '#DBDDE2'}"
            />
        </div>
        <div class="sign-up-body__passwd-contents">
          <input 
            type="password" 
            v-model="passwordRe"
            @blur="validatePasswordConfirm" 
            @input="validatePasswordConfirm" 
            placeholder="다시 한번 입력해주세요" />
        </div>
        <!-- END Password RE -->
        
        <!-- START Service Consent -->
        <div class="sign-up-body__service">
          <input
            type="checkbox" 
            id="check_box"
            v-model="isServiceCheck"
            :style="{ opacity: isServiceCheck ? 1 : 0 }"
            >
          <img v-if="!isServiceCheck" id="check_box_img" class="" src="@/assets/ic_check.png" >
          <p>
            <a :href="termsOfUse" target="_blank">서비스 이용약관</a> 및 <a :href="personalInfo" target="_blank">개인정보처리방침</a>에 동의합니다.
          </p>
        </div>
        <!-- END Service Consent -->

        <!-- START Next -->
        <button 
          type="submit" 
          class="blue_button" 
          :disabled="nextButton"
          :style="{background: nextButton ? '#BDC0C6' : '#2B66F5'}" 
          @click="saveData" 
          >
          다음
        </button>
        <!-- END Next -->
      </form>
    </div>
  </div>

</template>

<script setup>
  import { ref, computed, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from "@/store/index";
  import nav_bar from '@/layout/NavBar.vue';
  import { postAuthenticateEmail } from '@/api/member.js';

  const termsOfUse ="https://www.notion.so/746c26fbef964cb4918d9412f64c3d2b"
  const personalInfo = "https://www.notion.so/345ba3156844450b802cdcb6ea8f5160"
  const store = useStore();
  const router = useRouter();

  const isOpen = ref(false);
  const isChecked = ref(false); //서비스 동의 체크박스
  const selectedOption = ref('');
  const emailLocalError = ref('');

  const showAuthPopup = ref(false);//이메일 인증 팝업창 전용
  const toggleAuthenticate = () => {
    if (email.value != '' && selectedOption.value != '' && selectedOption.value != null && selectedOption.value != '선택' && !isEmailCheck.value && isEmailRegex.value){
      showAuthPopup.value = !showAuthPopup.value;
    }
    else if(isEmailCheck.value){
      alert('이미 이메일이 발송되었습니다.');
    }
    else{
      alert('이메일을 입력해주세요.');
    }
  };

  watch(selectedOption, (newValue, oldValue) => {
    // selectedOption이 변경될 때 실행할 코드를 여기에 작성합니다.
    console.log(`selectedOption이 ${oldValue}에서 ${newValue}로 변경되었습니다.`);
  });
  const options = ref(['선택', 'gmail.com', 'naver.com', 'nate.com', 'daum.net', 'hanmail.net', 'kakao.com']);
  const email = ref('');
  const isEmailCheck = ref(false);
  const isPasswordCheck = ref(false);
  const ispasswordCheckAgain = ref(false);
  const isServiceCheck = ref(false);
  const password = ref('');
  const passwordRe = ref('');
  const passwordConfirm = ref('');
  const passwordError = ref('');
  const isEmailRegex = ref(false);
  

  // BETA_1.2.1 이후 안씀.
  function authentication(){
    // router.push(`/email/authenticate?email=${email.value}&domain=${selectedOption.value}`);
    router.push({
      path: '/email/authenticate',
      query: {
      email: email.value,
      domain: selectedOption.value
      },
    });
  } 

  
  // computed
  const nextButton = computed(() => {
    return !(isEmailCheck.value && isPasswordCheck.value && ispasswordCheckAgain.value &&isServiceCheck.value);
  })

  function toggleDropdown() {
    isOpen.value = !isOpen.value;
  }

  function selectOption(option) {
    selectedOption.value = option;
    isOpen.value = true;
    validateAndAlert();
  }

  /**
   * @param {string} localPart 이메일의 로컬파트규칙을 검사합니다.
   */
  function emailValidation(localPart){
    // console.log(localPart);
    const regex = /^(?!.*\.\.)(?!^\.)[A-Za-z0-9.]+(?:\([^()]*\)[A-Za-z0-9.]*)*$/;

    return regex.test(localPart);
  }

  // BETA_1.3.0에서 수정 예정. 기능작동은 문제없으나 코드가 지저분함.
  function validatePassword() {
    if (passwordConfirm.value != ''){
      passwordConfirm.value = '';
      ispasswordCheckAgain.value = false;
    }
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:">?~;,.])[A-Za-z\d!@#$%^&*()_+{}:">?~;,.]{8,20}$/;
    if (!regex.test(password.value)) {
      passwordError.value = `Password must be 8-20 characters long, including letters, numbers, and special characters.`;
      isPasswordCheck.value = false;
    } else {
      passwordError.value = '';
      isPasswordCheck.value = true;
    }
    validatePasswordConfirm();
  }
  // BETA_1.2.1 수정
  function validatePasswordConfirm() {
    if(isPasswordCheck.value && password.value == passwordRe.value){
      ispasswordCheckAgain.value = true;
    }else{
      ispasswordCheckAgain.value = false;
    }

  }
  function validateService(){
    if (isServiceCheck.value){
      isServiceCheck.value = false;
    }
    else{
      isServiceCheck.value = true;
    }
  }


  /**
   * @param {function} emailValidation function
   */
  function validateAndAlert() {
    if (!emailValidation(email.value)) {
      emailLocalError.value = '이메일을 확인해주세요';
      isEmailCheck.value = false;
      isEmailRegex.value = false;
    }else{
      emailLocalError.value ='';
      isEmailRegex.value = true;
    }
  }
  function saveData(){
    store.saveStep1Data(email.value, selectedOption.value, password.value);
    router.push({
      path: '/step2',
      query: {
        title: '사용자 정보 입력',
      }
    });
  }
  function emailAuthenticate(){
    isEmailCheck.value = true;
    showAuthPopup.value = !showAuthPopup.value;
    handleAuthenticateEmail();
  }

  async function handleAuthenticateEmail() {
    try {
      // email.value = router.query.email;
      // domain.value = router.query.domain;
      await postAuthenticateEmail(email.value.trim() + '@' + selectedOption.value.trim());
      // const response = await postAuthenticateEmail(email.value.trim() + '@' + selectedOption.value.trim());
      // console.log('%c✨postAuthenticateEmail: ', 'color:#e34034;font-weight: bold;', response);
    } catch (error) {
      console.error(error);
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/style/common.scss";

  .sign-up{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    &__navbar{
      top: 0;
      width: 100%;
    }
    &-body{
      width: 100%;
      height: 100%;
      margin-top: 56px;
      background-color: $grey00;

      &__welcome-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 328px;
        height: 204px;
        margin: 0 auto;
      }
      &__welcome-words{
        font-family: 'NanumSquareNeo_extrabold';
        font-size: 20px;
        color: $grey100;
        margin-top: 16px;
      }
      &__email-label{
        display: flex;
        position: relative;
        margin: 8px 0px 4px;
        font-size: 18px;
        color: $grey100;
        font-family: 'NanumSquareNeo_bold';
        >p{
          margin-left: 2px;
        }
        &__check{
          position: absolute;
          right: 16px;
          top: calc(50% - 8px);
          color: $grey20;
        }
      }
      &__email-contents{
        margin: 4px 0px 12px;
        display: flex;
        align-items: center;
        justify-content:space-between;
        position: relative;
        >input{
          width: 136px;
        }
        >select{
          width: 136px;
        }
        &__authentication{
          width: 40px;
          height: 40px;
          border-radius: 8px;
          text-align: center;
          line-height: 40px;
          font-size: 12px;
          color: $grey00;
          font-family: 'NanumSquareNeo_extrabold';
        }
      }
      &__passwd-label{
        display: flex;
        position: relative;
        margin: 20px 0px 4px;
        font-size: 18px;
        color: $grey100;
        font-family: 'NanumSquareNeo_bold';
        >p{
          margin-left: 2px;
        }
        &__check{
          position: absolute;
          right: 16px;
          top: calc(50% - 8px);
          color: $grey20;
        }
      }
      &__passwd-contents{
        margin: 4px 0px 12px;
        display: flex;
        align-items: center;
        justify-content:space-evenly;
        >input{
          width: 100%;
        }
      }
      &__service{
        position: relative;
        display: flex;
        align-items: center;
        > p{
          margin-left: 8px;
        }
      }

    }
    &-auth-popup{
      width: 328px;
      height: 160px;
      position: absolute;
      top: calc(50% - 80px);
      left: calc(50% - 164px);
      z-index: 1000;
      box-sizing: border-box;
      background-color: #FFFFFF;
      border: 1px solid #E4E4E4;
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &__label{
        font-size: 16px;
        font-family: 'NanumSquareNeo_extrabold';
        color: #1D2532;
        margin-bottom: 24px;
      }

      &__container{
        display: flex;
        width: 100%;
        justify-content: space-evenly;
      }
      &__yes{
        width: 144px;
        height: 48px;
        background-color: #EAF0FE;
        border-radius: 8px;
        color: #367BF9;
      } 
      &__no{
        width: 144px;
        height: 48px;
        background-color: #2B66F5;
        border-radius: 8px;
        color: #FFF;
      }
    }
  }
</style>
