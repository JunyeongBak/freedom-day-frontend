<template>
  <div class="sign-up-step2">
    <div class="sign-up-step2__navbar">
      <nav_bar />
    </div>
    <div class="sign-up-step2-body">
      <form method="POST" @submit.prevent="handleSubmit" style="padding:0 16px 0;">
        <!-- START 닉네임 -->
        <div class="sign-up-step2-body__nickname-label">
          <img src="@/assets/ic_star.svg" alt="필수" />
          <p>닉네임</p>
          <van-icon 
            name="success" 
            class="sign-up-step2-body__nickname-label__check"
            :style="{color: isNickCheck ? '#2B66F5' : '#DBDDE2'}"
            />
          </div>
          <div class="sign-up-step2-body__nickname-contents">
            <input 
            class="sign-up-step2-body__nickname-contents__input" 
            placeholder="서비스에서 사용하실 이름을 말씀해주세요(최대10자)"
            v-model="nickname"
            @input="validateNickname" 
            @blur="validateNickname">
          </input>
          <p>{{ nicknameWarn }}</p>
        </div>
        <!-- END 닉네임 -->

        <!-- START 성별 -->
        <div class="sign-up-step2-body__gender-label">
          <p>성별</p>
        </div>
        <div class="sign-up-step2-body__gender-contents">
          <div
            id="sign-up-step2__gender-button-male"
            :class="{ active: gender === 'male' }"
            @click="setGender('male')"
          >
            남성
          </div>
          <div
            id="sign-up-step2__gender-button-female"
            :class="{ active: gender === 'female' }"
            @click="setGender('female')"
          >
            여성
          </div>
        </div>
        <!-- END 성별 -->

        <!-- START 생년월일 -->
        <div class="sign-up-step2-body__nickname-label">
          <p>생년월일</p>
        </div>
        <div class="sign-up-step2-body__nickname-contents">
          <input 
            class="sign-up-step2-body__nickname-contents__input" 
            placeholder="YYYY.MM.DD"
            v-model="formattedBirthData"
            @input="formatDate"
            @blur="formatDate"
            >
          </input>
          <p>{{ dateError }}</p>
        </div>
        <!-- END 생년월일 -->
        <button 
          id="step2-submit-button"
          class="blue_button"
          :disabled="submitButton"
          >
          가입완료
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
    import nav_bar from "@/layout/NavBar.vue";
    import { ref, computed, watch } from 'vue';
    import { postSignUp } from "@/api/member.js";
    import { useStore } from "@/store/index";
    import { useRouter } from "vue-router";
    const store = useStore();
    const router = useRouter();
    
    const isNickCheck = ref(false);
    const nickname = ref('');
    const gender = ref('');
    const nicknameWarn = ref('');
    const rawBirthData = ref('');
    const formattedBirthData = ref('');
    const isBirthDate = ref(false);
    const dateError = ref('');
    const confirmBirth = ref(false);

    function validateNickname(){
    // 허용: 영문, 한글, 이모티콘, 숫자
    // 유니코드 범위 사용: \p{L} (모든 문자), \p{N} (숫자), \p{Emoji} (이모티콘)
    const regex = /^[\p{L}\p{N}\p{Emoji} \]\[#*-.]{0,10}$/u;
    if(nickname.value.trim()==''){
      nicknameWarn.value = ('공백만 사용은 불가합니다');
      isNickCheck.value = false;
      return;
    }
    if(nickname.value.length > 10){
      nicknameWarn.value = ('10자 이하로 입력해주세요');
      isNickCheck.value = false;
      return;
    }
    if (!regex.test(nickname.value)) {
      nicknameWarn.value = ('특수문자 가능: [ _ - # * . ]');
      // nickname.value = '';
      isNickCheck.value = false;
    }else{
      isNickCheck.value = true;
      nicknameWarn.value = '';
    }

    if(nickname.value != '' && isNickCheck.value){
      isNickCheck.value = true;
      nicknameWarn.value = '';
    }else{
      isNickCheck.value = false;
    } 
  }

  /**
   * 
   * @param {String} selectedGender (String) 'male' or 'female'
   */
  function setGender(selectedGender){
    gender.value = selectedGender;
  }

  /**
   * 
   * @param {String} event const formattedBirthData
   */
  function formatDate(event) {
    const value = event.target.value;
    let numbers = value.replace(/[^\d]/g, '');  // 비숫자 제거
    numbers = numbers.slice(0, 8);  // 최대 8자리 (YYYYMMDD)
    rawBirthData.value = numbers;
    // 자동으로 점 추가
    if (numbers.length > 4) {
      numbers = numbers.slice(0, 4) + '.' + numbers.slice(4);
    }
    if (numbers.length > 7) {
      numbers = numbers.slice(0, 7) + '.' + numbers.slice(7);
    }

    // rawBirthData.value = numbers.replace(/\./g, ''); // 원본 숫자 데이터 저장
    formattedBirthData.value = numbers; // 포맷된 데이터 표시
    validateDate(numbers)
  }
  // 실제 날짜 유효성 검증
  function validateDate(dateStr) {
    // 점을 제거하고 날짜 객체 생성을 시도
    const cleanDate = dateStr.replace(/\./g, '');
    if(cleanDate.length < 8){
      dateError.value = 'YYYY.MM.DD 8자리 포맷 입력'
      return;
    }
    if (cleanDate.length === 8) {
      const year = parseInt(cleanDate.substring(0, 4), 10);
      const month = parseInt(cleanDate.substring(4, 6), 10) - 1; // JS는 월이 0부터 시작
      const day = parseInt(cleanDate.substring(6, 8), 10);

      const dateObj = new Date(year, month, day);
      if (dateObj.getFullYear() === year && dateObj.getMonth() === month && dateObj.getDate() === day) {
        dateError.value = '';
      } else {
        isBirthDate.value = false;
        dateError.value = ('존재하지 않는 날짜!');
        formattedBirthData.value = '';
      }
      if (dateObj > new Date()) {
        isBirthDate.value = false;
        dateError.value = ('미래 날짜는 불가합니다');
      }
    } else {
      isBirthDate.value = true;
      dateError.value = '';
    }
  }
  const submitButton = computed(()=>{
    if (formattedBirthData.value){
      if (rawBirthData.value.length == 8){
        confirmBirth.value = true;
      }else{
        confirmBirth.value = false;
      }
    }else {
      confirmBirth.value = true;
    }
    return !(isNickCheck.value && confirmBirth.value);
  })
  const handleSubmit = async() => {
    gender.value = gender.value == 'male' ? 'M' : 'F';

    try {
      const tmp = ref({
        "email" : store.formData.step1.email_beginning + "@" + store.formData.step1.email_back,
        "password" : store.formData.step1.password,
        "nickName" : nickname.value,
        "sex" : gender.value,
        "birthDate" : rawBirthData.value,
      });
      await postSignUp(tmp.value);
      router.push("/signin")
    } catch(error){
      alert('회원가입 실패: ' + error);
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/style/common.scss";
  .sign-up-step2{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    &__navbar{
      top:0;
      width: 100%;
    }
    &-body{
      width: 100%;
      height: 100%;
      margin-top: 56px;
      background-color: $grey00;
      &__nickname-label{
        display: flex;
        position: relative;
        margin: 16px 0px 8px;
        font-size: 18px;
        font-family: 'NanumSquareNeo_bold';
        > p{
          margin-left: 2px;
        }
        &__check{
          position: absolute;
          right: 16px;
          top: calc(50% - 8px);
          color: $grey20;
        }
      }
      &__nickname-contents{
        position: relative;
        >input {
          width: 100%;
          margin-bottom: 24px;
          
        }
        >p{
          position: absolute;
          top: 46px;
          right: 12px;
          text-align: right;
          font-size: 12px;
          color: #FF0B0B;
        }
      }
      &__gender-label{
        display: flex;
        position: relative;
        margin: 0px 0px 8px;
        font-size: 18px;
        font-family: 'NanumSquareNeo_bold';
        > p{
          margin-left: 2px;
        }
      }
      &__gender-contents{
        display: flex;
        margin-bottom: 24px;
        justify-content:space-between;
        align-items: center;
      }
    }
  }
  #sign-up-step2__gender-button{
    &-male{
      width: 160px;
      height: 40px;
      border-radius: 8px;
      text-align: center;
      line-height: 40px;
      border: 1px solid #898F9A;
      background-color: #fff;
      cursor: pointer;
      transition: background-color 0.3s, border-color 0.3;
    }
    &-female{
      width: 160px;
      height: 40px;
      border-radius: 8px;
      text-align: center;
      line-height: 40px;
      border: 1px solid #898F9A;
      background-color: #fff;
      cursor: pointer;
      transition: background-color 0.3s, border-color 0.3;
    }
    &-male.active{
      background-color: #2B66F5;
      color: white;
      border: 1px solid #FFF;
    }
    &-female.active{
      background-color: #2B66F5;
      color: white;
      border: 1px solid #FFF;
    }
  }
  #step2-submit-button:disabled{
    color: #FFF;
    background: gray;
    cursor: not-allowed;
  }
</style>