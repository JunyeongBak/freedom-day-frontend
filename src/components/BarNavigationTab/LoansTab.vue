<template>
  <div class="hasdata-container__background1">
    <div class="hasdata-container__total">
      <span><span style="color:#2B66F5;">{{ nickName }}</span> 님의 지난달 총 납부액</span>
      <div class="hasdata-container__total__amount">
        <img src="/src/assets/progressicon.svg" alt="Progress Icon"/>
        <span>{{ previousMonthPayment }}원</span>
      </div>
    </div>
  </div>
  <div class="hasdata-container__background2">
    <div class="hasdata-container__background2__title">
      <span>나의 대출 ({{ loanCount }}개)</span>
    </div>
    <div class="hasdata-container__details">
      <!-- Start] Card -->
      <loansCard 
        v-for="(item, index) in loanSimpleDtoList" 
        :key="item.expirationDate"
        :index="index"
        :loandata="item"
      />      
      <!-- End] Card -->

    </div>
  </div>

</template>

<style lang="scss">
  .hasdata {
    display: flex;
    flex-direction: column;
    min-width: 348px;
    min-height: 800px;
    max-width: 480px;
    position:relative;
    align-items: center;
    background-color: #F3F3F3;;

    main{
      width: 100%;
    }
    &-container__background1{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      min-width: 330px;
      background-color: #FFF;
    }

    &-container__total{
      display: flex;
      min-width: 328px;
      max-width: 480px;
      min-height: 128px;
      border-radius: 16px;
      flex-direction: column;
      font-size: 18px;
      font-family: 'NanumSquareNeo_extrabold';
      background-color: #FFF;
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
      margin-top: 24px;
      margin-bottom: 24px;
      margin-left: 16px;
      margin-right: 16px;
      padding: 16px;
      
      &__amount{
        display: flex;
        justify-content: left;
        align-items: center;
        margin-top: 8px;
      }
      img {
        width: 84px;
        height: 84px;
      }

      div > span{
        margin-left: 16px;
        font-size: 24px;
        font-family: 'NanumSquareNeo_heavy';
      }
    }

    &-container__background2{
      width: 100%;
      min-width: 330px;
      background-color: #FFF;
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      // text-align: center;
      &__title{
        width: 330px;
        > span{
          font-size: 18px;
          font-family: 'NanumSquareNeo_extrabold';
        }
        margin-top: 24px;;
      }

    }
// hasdata-container__details__handle-image
    &-container__details{
      display:flex;
      flex-direction: column;
      align-items: center;
      background-color: #FFF;
      > div{
        position: relative;
        display: flex;
        justify-content: left;
        align-items: center;
        min-width: 348px;
        max-width: 480px;
        min-height: 234px;
        margin: 16px;
        border: 1px solid #DBDDE2;
        border-radius: 16px;
        background-color: #FFF;
      }
      &__handle{ // 대출카드 핸들
        opacity: 0.0;
      }

      &__contents{
        min-width: 274px;
        background-color: #FFFFFF;//여기
        > div:nth-child(1){
          display: flex;
          > img{ // 대출카드 'x' 아이콘
            opacity: 0.0;
            position: absolute;
            right: 16px;
            top: 12px;
          }
          > div {
            display:flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-family: 'NanumSquareNeo_bold';
            min-width: 47px;
            min-height: 19px;
            border-radius: 999px;
            margin-right: 4px;
            color: #FFFFFF;
            &:nth-child(1){
              position: absolute;
              top: 16px;
              left: 38px;
              background: #565D69;
            }
            &:nth-child(2){
              position: absolute;
              top: 16px;
              left: 89px;
              background: #2B66F5;
            }
          }
        }
        &__line{
          border: 1px solid #F3F3F3;
          margin-top: 22px;
        }
        > div:nth-child(2){
          display:flex;
          > img{
            margin-right: 16px;
          }
          > div{
            display:grid;
            grid-template-columns: 1fr 1fr;
            gap:8px;

            > :nth-child(1){
              font-size: 12px;
              font-family: 'NanumSquareNeo_bold';
            }
            > :nth-child(2){
              text-align: right;
              color:#898F9A;
              font-size: 12px;
              font-family: 'NanumSquareNeo_bold';
              margin-right: 16px;
            }
            > :nth-child(3){
              min-width: 135px;
              font-size: 20px;
              font-family: 'NanumSquareNeo_extrabold';
            }
            > :nth-child(4){
              text-align: right;
              color:#898F9A;
              font-size: 12px;
              font-family: 'NanumSquareNeo_bold';
              margin-right: 16px;
            }
          }
        }
        &__charts{

          font-size: 12px;
          font-family: 'NanumSquareNeo_bold';
          margin-top: 8px;

          > div:first-child{
            display:flex;
            align-items: center;
            > div:first-child{
              width: 24px;
              height: 24px;
              background-color: #D9D9D9;
            }
            > div:nth-child(2){
              margin-left: 8px;
            }
          }
          > div:nth-child(2){
            position: absolute;
            bottom: 16px;
          }
          &__value {
            width: 274px;
            height: 16px;
            background-color: #DBDDE2;
            border-radius: 8px;
            overflow: hidden;
            // position: absolute;
            &__bar{
              height: 100%;
              background-color: #3982FA;
              border-radius: 8px 8px 8px 8px; /* Rounded corners on the left side */
            }
          }  
        }
      }

    }
  }
</style>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useStore } from "@/store/index";
  import loansCard from "@/components/BarNavigationTab/LoansTabCard.vue";
  const store = useStore();
  const nickName = ref('freedom');
  const loanCount = ref(0);
  const previousMonthPayment = ref(0);
  const repaymentRate = ref(0);
  const loanSimpleDtoList = ref(['']);


  onMounted(() => {
    previousMonthPayment.value = store.userData.previousMonthPayment.toLocaleString();
    repaymentRate.value = store.userData.repaymentRate;
    nickName.value = store.nickName;
    loanCount.value = store.userData.loanCount;
    loanSimpleDtoList.value = store.userData.loanSimpleDtoList;

    // console.log(loanSimpleDtoList.value[0]);
    // console.log(loanSimpleDtoList.value[1]);
  })

</script>
