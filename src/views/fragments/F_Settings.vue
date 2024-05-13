<template>
  <div class="settings">
    <div class="settings-profile">
      <img class="settings-profile-img" src="@/assets/ic_haebang.png" alt="profile"/>
      <p class="settings-profile-nickname">사용자명</p>
      <p class="settings-profile-update">개인정보 수정</p>
    </div>
    <div class="settings-line">

    </div>
    <div class="settings-item">서비스소개</div>
    <div class="settings-item">자주하는 질문</div>
    <div class="settings-item">문의 작성하기</div>
    <div class="settings-item">이용안내</div>
    <div class="settings-item">앱 버전</div>
    <div id="logout" class="settings-item" @click="toggleLogoutPopup">로그아웃</div>
    <div v-if="showLogoutPopup" class="overlay"></div>
    <div v-if="showLogoutPopup" class="settings-logout-popup">
      <p class="settings-logout-popup__label">로그아웃 하시겠습니까?</p>
      <div class="settings-logout-popup__container">
        <button @click="logout" class="settings-logout-popup__yes">네</button>
        <button @click="toggleLogoutPopup" class="settings-logout-popup__no">아니오</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from "@/store/index";
  import { useRouter } from "vue-router";
  import { ref, onMounted, computed, watch} from "vue";
  import { postLogout } from "@/api/member.js";

  const router = useRouter();
  const response = ref([]);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const showLogoutPopup = ref(false);//로그아웃 팝업창 전용

  const toggleLogoutPopup = () => {
    showLogoutPopup.value = !showLogoutPopup.value;
  };

  const logout = () => {
    // 로그아웃 로직을 여기에 작성하세요.
    // 예를 들어, 로그아웃 API를 호출하거나 로컬 스토리지의 토큰을 제거하는 등의 작업을 수행할 수 있습니다.
    // 로그아웃이 완료되면 팝업을 닫습니다.
    response.value =  postLogout();
    showLogoutPopup.value = false;
    // console.log(response.value);
    router.push("/");
  };

  onMounted(() => {
    scrollToTop();
  });
</script>

<style lang="scss" scoped>
  .settings{
    display:flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #FFF;
    &-profile{
      position: relative;
      width: 95%;
      height: 116px;
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
      border-radius: 16px;
      margin-top: 24px;

      &-img{
        position: absolute;
        top: calc(50% - 42px);
        left: 16px;
        width: 84px;
        height: 84px;
      }
      &-nickname{
        position: absolute;
        top: 30px;
        left: 116px;
        font-size: 18px;
        font-family: 'NanumSquareNeo_extrabold';
        color: #1D2532;
      }
      &-update{
        position: absolute;
        top: 62px;
        left: 116px;
        font-size: 14px;
        font-family: 'NanumSquareNeo_bold';
        color: #367BF9;
      
      }
    }
    &-line{
      width: 100%;
      height: 16px;
      background: #F7F8FA;
      margin: 16px 0;
    }
    &-item{
      width: 328px;
      height: 64px;
      margin: 0 auto;
      font-size: 16px;
      font-family: 'NanumSquareNeo_bold';
      line-height: 64px;
      border-bottom: 1px solid #F3F3F3;
    }
    &-logout-popup{
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
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black */
    background-color: #1D2532;
    opacity: 0.8;
    z-index: 999; /* ensure the overlay is on top of other elements */
  }
</style>