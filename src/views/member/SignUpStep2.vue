<template>
  <navbar />
  <div class="sign-up-step2">
    <form method="POST" class="sign-up-step2__form" @submit.prevent="handleSubmit">
      <!-- Start nick name -->
      <h2 class="sign-up-step2__form-nickname">
        <div>
          <span class="sign-up-step2__form-red-star">⁕</span>
          <span>닉네임</span>
        </div>
        <div :class="{'sign-up-step2__form-nickname-check-valid': isNickCheck, 'sign-up-step2__form-nickname-check': !isNickCheck}">
          <van-icon name="success" />
        </div>
      </h2>
      <div class="sign-up-step2__form-nickname-div-container">
        <input 
          class="sign-up-step2__form-nickname-input-txt" 
          placeholder="서비스에서 사용하실 이름을 말씀해주세요(최대10자)"
          v-model="nickname" 
          @input="validateNickname">
        </input>
      </div>
      <!-- End nick name -->

      <!-- Start gender -->
      <h2 class="sign-up-step2__form-nickname">
        <div>
          <span>성별</span>
        </div>
      </h2>
      <div class="sign-up-step2__form-gender">
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
      <!-- End gender -->

      <!-- Start birth day-->
      <h2 class="sign-up-step2__form-birthyearmonth">
        <div>
          <span>생년월일</span>
        </div>
      </h2>
      <div class="sign-up-step2__form-birthyearmonth-div-container">
        <input 
          class="sign-up-step2__form-birthyearmonth-input-txt"
          placeholder="YYYY.MM.DD"
          v-model="formattedBirthData"
          @input="formatDate">
        </input>
      </div>
      <!-- End birth day -->

      <!-- Start Submit -->
      <button 
        class="sign-up-step2__form-step2-button" 
        :disabled="submitButton">
        가입완료
      </button>
      <!-- End Submit -->
    </form>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useStore } from "@/store/index";
  import {useRouter} from "vue-router";
  import navbar from "@/components/BarNavigationSignStep2.vue";
  import { postSignUp } from "@/api/member.js";
  const store = useStore();
  const router = useRouter();
  const nickname = ref('');
  const birthyearmonth = ref('');
  const isNickCheck = ref(false);
  const gender = ref('');
  const rawBirthData = ref('');
  const formattedBirthData = ref('');
  const isBirthDate = ref(false);
  const dateError = ref('');

  //computed
  const submitButton = computed(()=>{
    return !(isNickCheck.value);
  })

  console.log(store.formData.step1.email_beginning)
  console.log(store.formData.step1.email_back)
  console.log(store.formData.step1.password)

  function setGender(selectedGender){
    gender.value = selectedGender;
    console.log(gender.value);
  }

  function validateNickname(){
    // 허용: 영문, 한글, 이모티콘, 숫자
    // 유니코드 범위 사용: \p{L} (모든 문자), \p{N} (숫자), \p{Emoji} (이모티콘)
    const regex = /^[\p{L}\p{N}\p{Emoji}]{0,10}$/u;

    if (!regex.test(nickname.value)) {
      alert('닉네임은 문자, 숫자, 이모티콘 10자리까지 가능!');
      nickname.value = '';
      isNickCheck.value = false;
    }else{
      isNickCheck.value = true;
    }

    if(nickname.value != '' && isNickCheck.value){
      isNickCheck.value = true;
    }else{
      isNickCheck.value = false;
    } 
  }
  function formatDate(event) {
    const value = event.target.value;
    let numbers = value.replace(/[^\d]/g, '');  // 비숫자 제거
    numbers = numbers.slice(0, 8);  // 최대 8자리 (YYYYMMDD)

    // 자동으로 점 추가
    if (numbers.length > 4) {
      numbers = numbers.slice(0, 4) + '.' + numbers.slice(4);
    }
    if (numbers.length > 7) {
      numbers = numbers.slice(0, 7) + '.' + numbers.slice(7);
    }

    console.log(numbers)
    // rawBirthData.value = numbers.replace(/\./g, ''); // 원본 숫자 데이터 저장
    formattedBirthData.value = numbers; // 포맷된 데이터 표시
    console.log(formattedBirthData.value);
    validateDate(numbers)
  }
  // 실제 날짜 유효성 검증
  function validateDate(dateStr) {
    // 점을 제거하고 날짜 객체 생성을 시도
    const cleanDate = dateStr.replace(/\./g, '');
    if (cleanDate.length === 8) {
      const year = parseInt(cleanDate.substring(0, 4), 10);
      const month = parseInt(cleanDate.substring(4, 6), 10) - 1; // JS는 월이 0부터 시작
      const day = parseInt(cleanDate.substring(6, 8), 10);

      const dateObj = new Date(year, month, day);
      if (dateObj.getFullYear() === year && dateObj.getMonth() === month && dateObj.getDate() === day) {
        dateError.value = '';
      } else {
        isBirthDate.value = false;
        alert('존재하지 않는 날짜!');
        formattedBirthData.value = '';
      }
    } else {
      isBirthDate.value = true;
    }
  }
  const handleSubmit = async() => {
    try {
      // 변수들...
      const tmp = ref({
        "email" : "newTestTest@naver.com",
        "password" : "test1234@",
        "nickName" : "testNickName",
        "sex" : "M",
        "birthDate" : "19880101"
      });
      await postSignUp(tmp.value);
      router.push("/signin")
    } catch(error){
      alert('회원가입 실패: ' + error);
    }
  }
</script>

<style lang="scss" scoped>
  body{
    font-style : 'NanumSquareNeo_normal';
    font-size: 18px;
  }

  .sign-up-step2{
    display:flex;
    flex-direction: column;
    align-items:start;
    width: 360px;
    height: 600px;
    background-color: #FFF;
    padding-left: 8px;
    padding-right: 8px;
    position: relative;
    box-sizing: border-box;

    &__form{
      height: 600px;
      &-red-star{
        color: #FE2525;
        font-style: 'NanumSquareNeo_bold';
      }
      // Start nickname
      &-nickname{
        display: flex;
        margin-top: 24px;
        width: 340px;
        height: auto;
        justify-content:space-between ;
        &-div-container{
          width: 100%;
        }
        &-input-txt{
          width: 328px;
          height: 40px;
          font-size: 12px;
          margin-top: 8px;
          border: 1px solid #898F9A;
          border-radius: 8px;
          padding-left: 8px;
          padding-right: 8px;
        }
        &-check{
          color: #DBDDE2;
        }
        &-check-valid{
          color: #2B66F5;
        }
        > span{
          font-style: 'NanumSquareNeo_extrabold';
        }
        > input{
          width: 100%;
        }
      }
      // End nickname

      // Start gender
      &-gender{
        display: flex;
        margin-top:24px;
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
          margin-right: 10px;
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
          margin-right: 10px;
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

      // End gender

      // Start birthday
      &-birthyearmonth{
        margin-top: 24px;
        &-div-container{
          width: 100%;
        }
        &-input-txt{
          width: 328px;
          height: 40px;
          font-size: 12px;
          margin-top: 8px;
          border: 1px solid #898F9A;
          border-radius: 8px;
          padding-left: 8px;
          padding-right: 8px;
        }
      }
      // End birthday

      // Start Submit
      &-step2-button{
        position: absolute;
        bottom: 50px;
        color: #FFF;
        background-color: #2B66F5;
        border-radius: 8px;
        width: 348px;
        height: 48px;
      }
      &-step2-button:disabled{
        color: #FFF;
        background: gray;
        cursor: not-allowed;
      }
      // End Submit
    }
  }
</style>