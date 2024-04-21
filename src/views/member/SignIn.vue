<template>
  <div class="nav-bar">
    <navbar />
  </div>
  <div class="sign-in">
    <div class="sign-in__card">
      <img src="@/assets/ic_login.png">
      <div>해방의 날</div>
    </div>
    <form method="POST" class="sign-in__form">
      <span>이메일</span>
      <div>
        <input placeholder="이메일"></input>
        <span>@</span>
        <div class="sign-in__form-drop-email">
          <div @click="toggleDropdown" class="sign-in__form-drop-email-button">
            {{ selectedOption || '선택' }}
            <van-icon name="arrow-down" class="sign-in__form-emailicon"/>
            <div v-show="isOpen" class="sign-in__form-drop-email-content">
              <div v-for="option in options" :key="option" @click="selectOption(option)">
                {{ option }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <span>비밀번호</span>
      <div>
        <input type="password" class="sign-in__form-password" placeholder="비밀번호를 입력해주세요"></input>
      </div>
      <div class="sign-in__form-convenience">
        <input type="checkbox" class="sign-in__form-remember">이메일 기억하기</input>
        <button>비밀번호 찾기</button>
      </div>
      <div class="sign-in__form-login">
        <button type="submit">로그인</button>
      </div>
    </form>
    <div class="sign-in__guest">
      <span>아직 회원이 아니세요?</span>
      <button>게스트로 서비스 둘러보기</button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import navbar from "@/components/BarNavigationLogin.vue";
  const isOpen = ref(false);
  const selectedOption = ref(null);
  const options = ref(['선택', 'gmail.com', 'naver.com', 'nate.com', 'daum.net', 'hanmail.net', 'kakao.com']);

  function toggleDropdown() {
    isOpen.value = !isOpen.value;
  }

  function selectOption(option) {
    selectedOption.value = option;
    isOpen.value = true;
  }


</script>

<style lang="scss">
  body{
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 18px;
  }

  .sign-in{
    display:flex;
    flex-direction: column;
    align-items: center;
    min-width: 360px;
    width: 100%;
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
      // position: relative;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      >div{
        display: flex;
        align-items: center;
        justify-content: left;
        margin-top: 8px;
        margin-bottom: 24px;
      }
      
      > div:nth-child(2) > input:nth-child(1) {
        width: 152px;
        height: 40px;
        margin-right: 4px; 
        border: 1px solid #898F9A;
        border-radius: 8px;
        padding-left: 8px;
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
        &-content {
          display: block;
          position: absolute;
          top: 50px;
          right: 0;
          background-color: #f9f9f9;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
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

      &-login{
        > button{
          color: #FFF;
          width: 352px;
          height: 48px;
          background: #2B66F5;
          border-radius: 8px;
        }
      }
      &-password{
        width: 340px;
        height: 40px;
        border: 1px solid #898F9A;
        border-radius: 8px;
        padding-left: 8px;
      }
      &-remember{
        height: 16px;
        width: 16px;
      }

      &-convenience{
        > button:nth-child(2){
          margin-left: 80px;
          background: #FFF;
          border: inherit;
        }
      }
      > span{
        font-weight: 800;
      }
    }
    &__guest{
      display: flex;
      flex-direction: column;
      margin-top: 16px;
      text-align: center;
      > button{
        background: #FFF;
        border: inherit;
        margin-top: 16px;
      }
    }
  }
</style>
