<template>
  <div class="loan-statistics" >
    <div class="loan-statistics-remind">
      <p class="loan-statistics-remind__currentDate">{{ currentDate }}</p>
      <p class="loan-statistics-remind__due">상환 예정</p>
      <div class="loan-statistics-remind-card">
        <img class="loan-statistics-remind-card__bankimg" src="@/assets/ic_bank.png" alt="">
        <div class="loan-statistics-remind-card-info">
          <p class="loan-statistics-remind-card-info__purpose">학자금</p>
          <p class="loan-statistics-remind-card-info__dday">D-16</p>
        </div>
        <p class="loan-statistics-remind-card__name">카카오 학자금대출</p>
        <p class="loan-statistics-remind-card__duedate">2024.12.18</p>
      </div>
      <div class="loan-statistics-remind-card">
        <img class="loan-statistics-remind-card__bankimg" src="@/assets/ic_bank.png" alt="">
        <div class="loan-statistics-remind-card-info">
          <p class="loan-statistics-remind-card-info__purpose">생활비</p>
          <p class="loan-statistics-remind-card-info__dday">D-16</p>
        </div>
        <p class="loan-statistics-remind-card__name">토스뱅크 신용대출</p>
        <p class="loan-statistics-remind-card__duedate">2024.12.18</p>
      </div>
      <div>-----------------가로 구분선---------------</div>
      <div>
        <!-- style absolute -->
        <p>상환 완료</p>
        <p>500,000원</p>
        <img src="@/assets/ic_bank.png" alt="">
        <p>생활금</p>
        <p>하나은행 전세자금 대출</p>
        <p>500,000원</p>        
      </div>
    </div>
    <div class=loan-statistics-barchart>
      <p>월별 총 상환 그래프</p>

    </div>
    <div class="loan-statistics-piechart">
      <p>대출 원금 비중</p>

    </div>
  </div>
</template>

<script setup>
  import { useStore } from '@/store/index.ts';
  import { ref, onMounted, computed, watch, defineProps, watchEffect} from "vue";
  import { getLoanStatistics } from '@/api/loan.js';

  const store = useStore();
  const response = ref('');
  const totalPrincipal = ref(0);
  const totalPrincipalRepayment = ref(0);
  const emit = defineEmits(['response']);
  const currentDate = ref('');

  watchEffect(() => {
    emit('response', {_totalPrincipal: totalPrincipal.value, _totalPrincipalRepayment: totalPrincipalRepayment.value}); //HomePage.vue에 전달
  });

  onMounted(() => {
    store.setNavBarFlag('2_2');
    try{
      getLoanStatistics().then((res) => {
        response.value = res.response;
        totalPrincipal.value = res.response.totalPrincipal;
        totalPrincipalRepayment.value = res.response.totalPrincipalRepayment;
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // JavaScript의 getMonth()는 0부터 시작하므로 1을 더해줍니다.
        currentDate.value = `${year}년 ${month}월`;
        console.log('%c✨getLoanStatistics: ', 'color:#e34034;font-weight: bold;',res.response);
      });
    }catch(error){
      console.log('에러발생', error);
    }
  });

  const props = defineProps({
    msg: Number,
    isExpanded: Boolean
  });



</script>

<style lang="scss" scoped>
  .loan-statistics {
    width: 100%;
    height: 100vh;
    background-color: #FFF;
    padding-top: 16px;
    box-sizing: border-box;

    &-remind{
      &__currentDate{
        font-size: 16px;
        font-family: 'NanumSquareNeo_bold';
        margin-left: 16px;
      }
      &__due{
        font-size: 16px;
        font-family: 'NanumSquareNeo_bold';
        margin-top: 16px;
        margin-left: 16px;
        margin-bottom: 16px;
      }
      &-card{
        // background-color: orange;
        position: relative;
        width: 100vw;
        height: 50px;
        &__bankimg{
          position: absolute;
          top: 0;
          left: 16px;
          width: 48px;
          height: 48px;
        }
        &-info{
          position: absolute;
          top: 3.5px;
          left: 72px;
          display: flex;

        }
        &-info__purpose{
          display: inline-block;
          text-align: center;
          line-height: 19px;
          min-width: 50px;
          height: 19px;
          background: #FFCE58;
          border-radius: 999px;
          margin-right: 4px;
          font-size:12px;
          font-family: 'NanumSquareNeo_bold';
          color: #FFF
        }
        &-info__dday{
          display: inline-block;
          text-align: center;
          line-height: 19px;
          min-width: 50px;
          height: 19px;
          background: #2B66F5;
          border-radius: 999px;
          font-size:12px;
          font-family: 'NanumSquareNeo_bold';
          color: #FFF
        }
        &__name{
          position: absolute;
          bottom: 3.5px;
          left: 72px;
          font-size:16px;
          font-family: 'NanumSquareNeo_bold';
        }
        &__duedate{
          position: absolute;
          bottom: 3.5px;
          right: 16px;
          font-size:14px;
          font-family: 'NanumSquareNeo_normal';
        }
      }
    }
  }
</style>