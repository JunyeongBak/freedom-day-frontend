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
          <van-icon name="success" class="sign-up-body__email-label__check"/>
        </div>
        <div class="sign-up-body__email-contents">
          <input
            type="text" 
            v-model="email" 
            @blur="validateAndAlert" 
            @input="validateAndAlert" 
            placeholder="이메일" />
          <span>@</span>
          <select 
            class="select-style" 
            :style="{color: selectedOption =='' ? '#BDC0C6' : '#1D2532'}" 
            v-model="selectedOption"
            >
            <option value="" disabled selected hidden >선택</option>
            <option value="gmail.com" >gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="nate.com">nate.com</option>
            <option value="daum.net">daum.net</option>
            <option value="hanmail.net">hanmail.net</option>
            <option value="kakao.com">kakao.com</option>
          </select>
          <div class="sign-up-body__email-contents__authentication">인증</div>
        </div>
        <!-- END Email -->

        <!-- START Password -->
        <div class="sign-up-body__passwd-label">
          <img src="@/assets/ic_star.svg" alt="필수" />
          <p>비밀번호</p>
          <van-icon name="success" class="sign-up-body__email-label__check"/>
        </div>
        <div class="sign-up-body__passwd-contents">
          <input 
            type="password" 
            v-model="password" 
            @blur="validatePassword" 
            @input="validatePassword" 
            placeholder="영문+숫자+특수문자 포함 8~20자리" />
        </div>
        <!-- END Password -->

        <!-- START Password RE -->
        <div class="sign-up-body__passwd-label">
          <img src="@/assets/ic_star.svg" alt="필수" />
          <p>비밀번호 확인</p>
          <van-icon name="success" class="sign-up-body__email-label__check"/>
        </div>
        <div class="sign-up-body__passwd-contents">
          <input 
            type="password" 
            @blur="" 
            @input="" 
            placeholder="다시 한번 입력해주세요" />
        </div>
        <!-- END Password RE -->
        
        <!-- START Service Consent -->
        <div class="sign-up-body__service">
          <input type="checkbox" id="check_box" v-model="isChecked" :style="{ opacity: isChecked ? 1 : 0 }">
          <img v-if="!isChecked" id="check_box_img" class="" src="@/assets/ic_check.png" >
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

  const termsOfUse ="https://www.notion.so/746c26fbef964cb4918d9412f64c3d2b"
  const personalInfo = "https://www.notion.so/345ba3156844450b802cdcb6ea8f5160"
  const store = useStore();
  const router = useRouter();

  const isOpen = ref(false);
  const isChecked = ref(false); //서비스 동의 체크박스
  const selectedOption = ref('');

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
        justify-content:space-evenly;
        >input{
          width: 136px;
        }
        >select{
          width: 136px;
        }
        &__authentication{
          width: 40px;
          height: 40px;
          background: #BDC0C6;
          border-radius: 8px;
          text-align: center;
          line-height: 40px;
          font-size: 12px;
          color: $grey60;
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
      }

    }
  }
</style>
