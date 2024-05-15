<template>
  <div class="loan-details-fragment">
    <div class="loan-details-fragment__container1">
      <p class="label">상환 세부 내용</p>
      <div class="loan-details-fragment__calendar">
        <div style="display:flex; width:195px; align-items: center;justify-content: space-between;">
          <img src="@/assets/ic_24_left_grey80.svg" alt="calendar" style="width:24px; height: 24px;">
          <p>2024.11</p>
          <img src="@/assets/ic_24_right_grey80.svg" alt="calendar" style="width:24px; height: 24px;">
        </div>
        <img src="@/assets/ic_haebang_56.svg" alt="calendar" style="width:56px; height: 56px;">
        <p style="font-size:18px; font-family: 'NanumSquareNeo_bold';">이번 달도 상환 하셨나요?</p>
        <div class="loan-details-fragment__calendar-write" @click="">네! 상환 입력하기</div>
      </div>
    </div>
    <div class="loan-details-fragment__container2">
      <p class="label">월별 그래프</p>
      <div class="loan-details-fragment__chart">d</div>
    </div>
    <div class="loan-details-fragment__container3">
      <p class="label">대출 정보</p>
      <div class="loan-details-fragment__info">d</div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useStore } from '@/store';
  import { useRouter } from 'vue-router'
  import nav_bar from "@/layout/NavBar.vue";
  import { getLoanDetails } from '@/api/loan.js';

  const router = useRouter();
  const store = useStore();
  const response = ref(null);
  const loanId = ref(0);

  onMounted(async () => {
    loanId.value = router.currentRoute.value.query.id;
    console.log(loanId.value);
    const res = await getLoanDetails(loanId.value);
    console.log(res);
    // response.value = res.data;
  });

</script>

<style lang="scss" scoped>
  @import "@/style/common.scss";
  .loan-details-fragment {
    width: 328px;
    height: 190px;
    margin: 300px auto;
    &__container1{
      // background-color: orange;
    }
    &__calendar{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content:space-evenly;
      width: 328px;
      height: 232px;
      border: 1px solid #DBDDE2;
      border-radius: 16px;
      &-write{
        width: 145px;
        height: 40px;
        border: 1px solid $blue10;
        border-radius: 16px;
        text-align: center;
        line-height: 40px;
        color: $blue10;
        font-size: 14px;
        font-family: 'NanumSquareNeo_extrabold';
      }
    }
    &__container2{
      background-color: yellow;
    }
    &__chart{
      width: 328px;
      height: 232px;
      border: 1px solid #DBDDE2;
      border-radius: 16px;
    }
    &__container3{
      background-color: green;
    }
    &__info{
      width: 328px;
      height: 232px;
      border: 1px solid #DBDDE2;
      border-radius: 16px;
    }
  }
  .label{
    font-size: 18px;
    font-family: 'NanumSquareNeo_extraBold';
    color: #000000;
    margin: 24px 0 16px;
  }
</style>