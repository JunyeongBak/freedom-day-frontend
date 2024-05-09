<template>
  <div class="sign-in">
    <!-- START sign-in__card -->
    <div class="sign-in__img-card">
      <img src="@/assets/ic_login001.png">
      <div>해방의 날</div>
    </div>
    <!-- END sign-in__card  -->

    <!-- START FORM -->
    <form method="POST" class="sign-in-form">
      <!-- START sign-in__email -->
      <p class="input_label">이메일</p>
      <div class="sign-in-form__email">
        <input v-model="template.email" type="text" class="sign-in-form__email__front" placeholder="이메일">
        <p>@</p>
        <select v-model="selectedOption ">
          <option disabled value="선택">선택</option>
          <option value="gmail.com">gmail.com</option>
          <option value="naver.com">naver.com</option>
          <option value="nate.com">nate.com</option>
          <option value="daum.net">daum.net</option>
          <option value="hanmail.net">hanmail.net</option>
          <option value="kakao.com">kakao.com</option>
        </select>
      </div>
      <!-- END sign-in__email -->
  
      <!-- START sign-in__password -->
      <div class="sign-in-form__password">
        <p class="input_label">비밀번호</p>
        <input v-model="template.password" type="password" placeholder="비밀번호를 입력해주세요">
      </div>
      <!-- END sign-in__password -->

      <!-- START sign-in__rememberID -->
      <div class="sign-in-form__remember-id">
        <input type="checkbox" id="check_box" v-model="isChecked" :style="{ opacity: isChecked ? 1 : 0 }">
        <img v-if="!isChecked" id="check_box_img" class="sign-in-form__remember-id__img" src="@/assets/ic_check.png" >
        <label for="check_box" >이메일 기억하기</label>
        <div class="sign-in-form__find-password">
          <router-link to="">비밀번호 찾기</router-link>
        </div>
      </div>
      <!-- END sign-in__rememberID -->
      <button type="button" class="blue_button" @click="handleClickSignIn">로그인</button>
    </form>
    <!-- END FORM -->

    <!-- START sign-up -->
    <div class="line-text">
      <router-link to="/signup"> 아직 회원이 아니세요?</router-link>
    </div>
    <!-- END sign-up -->

    <!-- START Guest -->
    <div class="line-text">
      <router-link to="">게스트로 서비스 둘러보기</router-link>
    </div>
    <!-- END Guest -->
  </div>
</template>

<script setup>
  /**
   * 기본 필수 라이브러리
   */
  import { useRouter } from 'vue-router'
  import { ref } from 'vue';
  import { postSignIn } from "@/api/member.js"
  import { getUserLoanInfo } from "@/api/loan.js";
  import { useStore } from "@/store/index";
  const router = useRouter();
  const store = useStore();
  const token =ref({
    access : null,
    refresh : null
  });

  /**
   * onMounted
   */
  // onMounted(() => {
  //   token.access = localStorage.getItem('accessToken');
  //   token.refresh = localStorage.getItem('refreshToken');
  // });

  /**
   * 로그인
   */
  const isChecked = ref(false);
  const selectedOption  = ref('선택');

  const template = ref({
    email: "",
    password: "",
  });

  const signinParam = ref({
    email: "",
    password: "",
  });

  async function handleClickSignIn() {
    if (selectedOption.value == undefined) {
      const message_temp = '이메일 양식을 확인하세요. 도메인 선택!';
      alert(message_temp);
      throw new Error(message_temp);
    }

    try {
      signinParam.value.password = template.value.password;
      signinParam.value.email = template.value.email + "@" + selectedOption.value;

      const response = await postSignIn(signinParam.value);
      store.saveNickName(String(response.response.nickName));
      store.setNavBarFlag('1_0');
      console.log(store.navBarFlag);

      router.push("/home");
    } catch (e) {
      const { code } = e;

      // 유저 이메일 없음
      if (code === "ACCOUNT-001") {
        alert("로그인 정보와 일치하지 않습니다(001)");
        // 비밀번호가 틀림
      } else if (code === "ACCOUNT-002") {
        alert("로그인 정보와 일치하지 않습니다(002)");
      }
    }
  }

</script>

<style lang="scss" scoped>
  .sign-in{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height:auto;
    background-color: #ffffff;
    &__img-card{
      margin-top: 80px;
      > img{
        width: 104px;
        height: 110px;
      }
      > div{
        font-size: 20px;
        font-family: "NanumSquareNeo_extrabold";
        margin-top: 16px;
      }
      display: flex;
      flex-direction: column;
      width: 328px;
      height: 204px;
      justify-content: center;
      align-items: center;
    }

    &-form{
      display: flex;
      position: relative;
      flex-direction: column;
      &__email{
        display: flex;
        flex-direction: row;
        align-items: center;
        > p {
          // font-size: 18px;
          margin-left: 8px;
          margin-right: 8px;
        }
      }
      &__password{
        margin-top: 24px;
        > input {
          width: 334px;
        }
      }

      &__remember-id{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 18px;
        position: relative;
        font-size: 12px;
        font-family: 'NanumSquareNeo_bold';
        > input{
          margin-right: 6px;
        }
      }
      &__find-password{
        position: absolute;
        right: 0;
      }
    }
    
    .line-text{
      font-size: 12px;
      color: #565D69;
      font-family: 'NanumSquareNeo_bold';
      border-bottom: 1px solid #565D69;
      margin-top: 16px;
    }
  }
</style>
