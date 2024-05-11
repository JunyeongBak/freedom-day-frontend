<template>
  <div class="navbar">
    <navbar />
  </div>
  <div class="sign-up">
    <div class="sign-up__card">
      <img src="@/assets/ic_login001.png">
      <div id="sign-up__welcome-div">해방의 날에 오신 걸 환영해요!</div>
    </div>
    <form method="POST" class="sign-up__form" @submit.prevent="handleSubmit">
      <h2 class="sign-up__form-email">
        <span class="sign-up__form-red-star">⁕</span>
        <span>이메일</span>
        <div class="sign-up__form-email-check" :class="{'sign-up__form-email-check-valid' : isEmailCheck}">
          <van-icon name="success" />
        </div>
      </h2>
      <div>
        <input class="sign-up__form-email-txt" placeholder="이메일" v-model="email" @blur="validateAndAlert"></input>
        <span>@</span>
        <div class="sign-up__form-drop-email">
          <div @click="toggleDropdown" class="sign-up__form-drop-email-button">
            {{ selectedOption || '선택' }}
            <van-icon name="arrow-down" class="sign-up__form-emailicon"/>
            <div v-show="isOpen" class="sign-up__form-drop-email-content">
              <div v-for="option in options" :key="option" @click="selectOption(option)">
                {{ option }}
              </div>
            </div>
          </div>
        </div>
        <div class="sign-up__form-email-auth" @click="authentication">인증</div>
      </div>
      <h2 class="sign-up__form-password">
        <span class="sign-up__form-red-star">⁕</span>
        <span>비밀번호</span>
        <div class="sign-up__form-password-check" :class="{'sign-up__form-password-check-valid': isPasswordCheck }">
          <van-icon name="success" />
        </div>
      </h2>
      <div>
        <input type="password" class="sign-up__form-password-txt" placeholder="영문+숫자+특수문자 포함 8~20자리"
        v-model="password" @input="validatePassword"></input>
        <!-- <p v-if="passwordError">{{ passwordError }}</p> -->
      </div>
      <h2 class="sign-up__form-password-again">
        <span class="sign-up__form-red-star">⁕</span>
        <span>비밀번호 확인</span>
        <div class="sign-up__form-password-again-check" :class="{'sign-up__form-password-again-check-valid' : ispasswordCheckAgain }">
          <van-icon name="success" />
        </div>
      </h2>
      <div>
        <input type="password" class="sign-up__form-password-txt-confirm" placeholder="다시 한번 입력해주세요"
        v-model="passwordConfirm" @input="validatePasswordConfirm"></input>
      </div>
      <div class="sign-up__form-privacy" id="sign-up__form-privacy">
        <input v-model="isServiceCheck" @input="validateService" type="checkbox" class="sign-up__form-privacy-checkbox"></input>
        <label>서비스 이용약관 및 개인정보처리방침에 동의합니다.</label>
      </div>
      <div class="sign-up__form-step1">
        <button class="sign-up__form-step1-button" :disabled="nextButton"
        @click="saveData">다음</button>
      </div>
    </form>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from "@/store/index";
  import navbar from "@/components/BarNavigationSignUp.vue";

  const store = useStore();
  const router = useRouter();

  const isOpen = ref(false);
  const selectedOption = ref(null);
  const options = ref(['선택', 'gmail.com', 'naver.com', 'nate.com', 'daum.net', 'hanmail.net', 'kakao.com']);
  const email = ref('');
  const isEmailCheck = ref(false);
  const isPasswordCheck = ref(false);
  const ispasswordCheckAgain = ref(false);
  const isServiceCheck = ref(false);
  const password = ref('');
  const passwordConfirm = ref('');
  const passwordError = ref('');

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


  function emailValidation(input){
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(input);
  }

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
  }

  function validatePasswordConfirm() {
    if (password.value !== passwordConfirm.value) {
      passwordError.value = 'Passwords do not match.';
      ispasswordCheckAgain.value = false;
    } else {
      passwordError.value = '';
      ispasswordCheckAgain.value = true;
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
  function validateAndAlert() {
    if (!emailValidation(email.value)) {
      email.value = '';
      isEmailCheck.value = false;
      // alert('영문, 숫자 입력하세요'); // 정기미팅 지적 사항
    }
    
    if(email.value!='' && selectedOption.value != '선택' && selectedOption.value != '' && selectedOption.value != null) {
      isEmailCheck.value = true;
      // alert('[개발용] 이메일이 인증되었습니다.')
    }
    else{
      isEmailCheck.value = false;
    }
  
  }
  function saveData(){
    store.saveStep1Data(email.value, selectedOption.value, password.value);
    router.push('/step2');
  }
</script>

<style lang="scss" scoped>
  body{
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 18px;
  }
  .sign-up{
    display:flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 800px;
    background-color: #FFF;



    &__card{
      display: flex;
      flex-direction: column;
      width: 340px;
      height: 204px;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      font-weight: 800;

      > img{
        margin-top: 24px; 
        width: 104px;
        height: 110px;
      }
      >div{
        margin-top: 16px;
        margin-bottom: 24px;
      }
    }
    &__form{
      margin-top: 32px;
      position: relative;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      >div{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 8px;
        margin-bottom: 24px;
      }
      > div:nth-child(2) > input:nth-child(1) {
        width: 128px;
        height: 40px;
        margin-right: 4px; 
        border: 1px solid #898F9A;
        border-radius: 8px;
        padding-left: 8px;
      }
      > div:nth-child(2) > div:nth-child(3) {
        width: 150px;
        height: 40px;
      }
      &-email{
        position: relative;
        &-check{
          position: absolute;
          right: 8px;
          top: 0;
          color: #DBDDE2;
        }
        &-check-valid{
          position: absolute;
          right: 8px;
          top: 0;
          color: #2B66F5;
        }
      }
      &-drop-email{
        position: relative;
        display: block;

        &-button{
          padding: 10px;
          border: 1px solid #898F9A;
          border-radius: 8px;
          margin-left: 4px;
          cursor: pointer;
        }

        &-content{
          display: block;
          position: absolute;
          top: 50px;
          right: 0;
          background-color: #f9f9f9;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rbga(0,0,0,0.2);
          z-index: 1;
        }
        &-content div{
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
        }
        &-content div:hover{
          background-color: #f1f1f1;
        }
      }
      &-emailicon{
        position: absolute;
        right: 15px;
      }
      &-email-auth{
        width: 50px;
        height: 40px;
        background-color: #BDC0C6;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 400;
        text-align: center;
        line-height: 40px;
        margin-left: 2px;
      }

      &-red-star{
        color: #FE2525;
        font-weight: 700;
        margin-right: 4px;
      }
      &-password{
        position: relative;

        &-check{
          position: absolute;
          top: 0;
          right: 8px;
          color: #DBDDE2;
        }
        &-check-valid{
          position: absolute;
          right: 8px;
          top: 0;
          color: #2B66F5;
        }
      }
      &-password-txt {
        width: 328px;
        height: 40px;
        border: 1px solid #898F9A;
        border-radius: 8px;
        font-size: 12px;
        padding-left: 8px;
        padding-right: 8px;

      }
      &-password-txt-confirm{
        width: 328px;
        height: 40px;
        border: 1px solid #898F9A;
        border-radius: 8px;
        font-size: 12px;
        padding-left: 8px;
        padding-right: 8px;
      }
      &-password-again{
        position: relative;

        &-check{
          position: absolute;
          top: 0;
          right: 8px;
          color: #DBDDE2;
        }
        &-check-valid{
          position: absolute;
          top: 0;
          right: 8px;
          color: #2B66F5;
        }
      }
      label{
        font-size: 12px;
        font-weight: 700;
      }

      &-privacy-checkbox{
        width: 24px;
        height: 24px;
        margin-right: 4px;
      }
      &-step1{
        &-button{
          color: #FFF;
          width: 352px;
          height: 48px;
          background: #2B66F5;
          border-radius: 8px;
        }
        &-button:disabled{
          color: #FFF;
          width: 352px;
          height: 48px;
          background: gray;
          border-radius: 8px;
          cursor: not-allowed;
        }
      }
    }
    #sign-up__form-privacy{
      display: flex;
      justify-content: left;
      margin-left: 8px;
    }

    #sign-up__welcome-div{
      font-size: 20px;
      font-family: 'NanumSquareNeo_extrabold';
    }
  }
</style>
