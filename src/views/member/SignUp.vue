<template>
  <div>
    <navbar />
  </div>
  <div class="sign-up">
    <div class="sign-up__card">
      <img src="@/assets/ic_login.png">
      <div>해방의 날에 오신 걸 환영해요!</div>
    </div>
    <form method="POST" class="sign-up__form">
      <span>이메일</span>
      <div>
        <input placeholder="이메일"></input>
        <span>@</span>
        <input placeholder="선택">
          <van-icon @click="" name="arrow-down" class="sign-up__form-emailicon" />
        </input>
        <button>인증하기</button>
      </div>
      <span>비밀번호</span>
      <div>
        <input type="password" class="sign-up__form-password" placeholder="비밀번호를 입력해주세요"></input>
      </div>
    </form>
  </div>
</template>

<script setup>
  import navbar from "@/components/BarNavigationSignUp.vue";
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
  .sign-up{
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
      > div:nth-child(2) > input:nth-child(3) {
        width: 128px;
        height: 40px;
        margin-left: 4px; 
        border: 1px solid #898F9A;
        border-radius: 8px;
        padding-left: 8px;
      }
      &-emailicon{
        right: 10px;
        position: absolute;
        z-index: 1;
      }
    }
  }
</style>
