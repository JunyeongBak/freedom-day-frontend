<template>
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
        <input placeholder="선택">
          <van-icon name="arrow-down" class="sign-in__form-emailicon" />
        </input>
      </div>
      <span>비밀번호</span>
      <div>
        <input type="password" class="sign-in__form-password" placeholder="비밀번호를 입력해주세요"></input>
      </div>
      <div class="sign-in__form-convenience">
        <input type="checkbox" class="sign-in__form-remember">이메일 기억하기</input>
        <button>비밀번호 찾기</button>
      </div>
      <button type="submit">로그인</button>
    </form>
    <div class="sign-in__guest">
      <span>아직 회원이 아니세요?</span>
      <button>게스트로 서비스 둘러보기</button>
    </div>
  </div>
</template>

<script setup>
   
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
      width: 328px;
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
      >div{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 8px;
        margin-bottom: 24px;
      }
      > div:nth-child(2) > input {
        width: 152px;
        height: 40px;
        border: 1px solid #898F9A;
        border-radius: 8px;
        padding-left: 8px;
      }
      &-password{
        width: 328px;
        height: 40px;
        border: 1px solid #898F9A;
        border-radius: 8px;
        padding-left: 8px;
      }
      &-remember{
        height: 16px;
        width: 16px;
      }
      &-emailicon{
        right: 10px;
        position: absolute;
        z-index: 1;
      }
      &-convenience{
        > button:nth-child(2){
          margin-left: 80px;
          background: #FFF;
          border: inherit;
        }
      }
      > button{
        color: #FFF;
        width: 328px;
        height: 48px;
        background: #2B66F5;
        border-radius: 8px;
      }
      > span{
        font-weight: 800;
      }
    }
    &__guest{
      display: flex;
      flex-direction: column;
      margin-top: 16px;
      > button{
        background: #FFF;
        border: inherit;
        margin-top: 16px;
      }
    }
  }
</style>
