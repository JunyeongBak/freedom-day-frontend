<template>
  <div class="loan">
    <div class="loan-total">
      <p class="loan-total-info__label">
        <span>{{ response.nickName }}</span> 님의 지난달 총 납부액
      </p>
      <div class="loan-total-info__card">
        <img src="@/assets/loan001.png" alt="대출" />
        <p>{{ response.previousMonthPayment }}원</p>
      </div>
    </div>
    <div class="separators"></div>
    <div class="loan-card">
      <p>
        나의 대출 <span>({{ response.loanCount }}개)</span>
        <!-- {{ msg }} -->
      </p>
      <div class="loan-card__container" >
        <!-- Start] Card -->
        <loansCard 
          v-for="(item, index) in response.loanSimpleDtoList" 
          :key="item.expirationDate"
          :index="index"
          :loandata="item"
          @click="handleLoanCardClick(item)"
        />
        <!-- End] Card -->

      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue';
  import { getUserLoanInfo } from '@/api/loan.js';
  import loansCard from '@/components/BarNavigationTab/LoansTabCard.vue';
  import { get } from 'vant/lib/utils';
  import { useStore } from '@/store';
  const store = useStore();
  const response = ref({
    nickName: '홍길동',
    previousMonthPayment: 0,
    loanCount: 0,
    loanSimpleDtoList: [],
  });  
  const props = defineProps({
    msg: Number,
  });

  function handleLoanCardClick(item){
    console.log(item);
  }

  onMounted(() => {
    try{
      // getLoanInfo();
      if (store.nickName !== null){
        response.value.nickName = store.nickName;
      }
      getUserLoanInfo().then((res) => {
        console.log('api 고고');
        if (res.response.previousMonthPayment !== null) {
          response.value.previousMonthPayment = res.response.previousMonthPayment.toLocaleString();
        }
        if (res.response.loanCount !== null) {
          response.value.loanCount = res.response.loanCount;
        }
        response.value.loanSimpleDtoList = res.response.loanSimpleDtoList;
        console.log(res.response);
      });
    }catch(error){
      console.log('에러발생', error);
    }
  });


  // watch()

</script>

<style lang="scss" scoped>
  .loan {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    height: auto;
    background-color: #fff;
    &-total{
      font-size: 18px;
      font-family: 'NanumSquareNeo_extrabold';
      width: 90%;
      max-width: 400px;
      height: 148px;
      box-sizing: border-box;
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
      border-radius: 16px;
      margin: 24px auto;
      padding: 16px;
      > p > span {
        color: #2B66F5;
      }
      
      &-info__label{
        background-color: inherit;
      }

      &-info__card{
        display: flex;
        align-items: center;
        width: 100%;
        height: 84px;
        margin-top: 8px;
        > img{
          width: 84px;
          height: 84px;
        }
        > p{
          font-size: 24px;
          font-family: 'NanumSquareNeo_heavy';
          color: #101113;
          margin-left: 16px;
        }
      }
    }
  }
  .separators{
    background-color: #F7F8FA;
    width: 100%;
    height: 16px;
  }
  .loan-card{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    > p{
      position: absolute;
      top: 24px;
      left: 16px;
      // margin-left: 16px;
      font-size: 18px;
      color: #000000;
      font-family: 'NanumSquareNeo_extrabold';
    }
    width: 100%;
    height: 100%;
    &__container{
      margin-top: 56px;
    }
  }
</style>