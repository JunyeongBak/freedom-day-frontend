<template>
  <div class="loan-details-fragment">
    <div class="loan-details-fragment__container1">
      <p class="label">상환 세부 내용</p>
      <div class="loan-details-fragment__calendar">
        <div style="display:flex; width:195px; align-items: center;justify-content: space-between;">
          <img 
            src="@/assets/ic_24_left_grey80.svg" 
            alt="calendar" 
            style="width:24px; height: 24px;"
            @click="minusIndex(currentRepayment.id)"
            >
          <p>{{ currentRepayment.historyDate }}</p>
          <!-- <ul>
            <li v-for="data in monthlyRepaymentList" :key="data.id">{{ data.historyDate }}</li>
          </ul> -->
          <img 
            src="@/assets/ic_24_right_grey80.svg" 
            alt="calendar" 
            style="width:24px; height: 24px;" 
            @click="addIndex(currentRepayment.id)"
            >
        </div>
        <img src="@/assets/ic_haebang_56.svg" alt="calendar" style="width:56px; height: 56px;">
        <p style="font-size:18px; font-family: 'NanumSquareNeo_bold';">이번 달도 상환 하셨나요?</p>
        <div class="loan-details-fragment__calendar-write" @click="">네! 상환 입력하기</div>
      </div>
    </div>
    <div class="loan-details-fragment__container2">
      <p class="label">월별 그래프</p>
      <div class="loan-details-fragment__chart" ref="barchartRef">
        <div class="loan-details-fragment__chart-label">(단위:천원)</div>
        <!-- 아래 v-for로 차트 -->
        <div class="loan-details-fragment__chart-container">
          <ul class="loan-details-fragment__chart-ul">
            <li v-for="month in loanDetails.repaymentHistoryMonthList" :id="month.id" class="loan-details-fragment__chart-li">
              <div class="loan-details-fragment__chart-total">{{ (month.repaymentAmount1 + month.repaymentAmount2 + month.repaymentAmount3) / 1000 || 0 }}</div>
              <div class="loan-details-fragment__chart-graph">
                <div class="loan-details-fragment__chart-graph__midterm" :style="{'height':  (month.repaymentAmount3 / 1000) + 'px' }"></div>
                <div class="loan-details-fragment__chart-graph__interest" :style="{'height': (month.repaymentAmount2 / 1000) + 'px'}"></div>
                <div class="loan-details-fragment__chart-graph__principal" :style="{'height': (month.repaymentAmount1 / 1000) + 'px'}"></div>
              </div>
              <div class="loan-details-fragment__chart-date">{{ month.historyDate.substring(2).replace('-','.') }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="loan-details-fragment__container3">
      <p class="label">대출 정보</p>
      <div class="loan-details-fragment__info">
        <div class="loan-details-fragment__info__container">
          <img src="@/assets/Rectangle_48_grey.png" style="width:48px; height:48px;"/>
          <div>
            <p class="loan-details-label">대출 실행</p>
            <div class="loan-details-value">{{ loanDetails.originationDate.replace('-','.').replace('-','.') }}</div>
          </div>
        </div>
        <div class="line"></div>
        <div class="loan-details-fragment__info__container">
          <img src="@/assets/Rectangle_48_grey.png" style="width:48px; height:48px;"/>
          <div>
            <p class="loan-details-label">대출 금액</p>
            <div class="loan-details-value">{{ Number.parseInt(loanDetails.totalPrincipal).toLocaleString() }}원</div>
          </div>
        </div>
        <div class="line"></div>
        <div class="loan-details-fragment__info__container">
          <img src="@/assets/Rectangle_48_grey.png" style="width:48px; height:48px;"/>
          <div>
            <p class="loan-details-label">대출 기간</p>
            <div class="loan-details-value">{{ loanDetails.loanPeriod }}개월</div>
          </div>
        </div>
        <div class="line"></div>
        <div class="loan-details-fragment__info__container">
          <img src="@/assets/Rectangle_48_grey.png" style="width:48px; height:48px;"/>
          <div>
            <p class="loan-details-label">대출 이율</p>
            <div class="loan-details-value">{{ loanDetails.interestRate }}%</div>
          </div>
        </div>
        <div class="line"></div>
        <div class="loan-details-fragment__info__container">
          <img src="@/assets/Rectangle_48_grey.png" style="width:48px; height:48px;"/>
          <div>
            <p class="loan-details-label">상환 방식</p>
            <div class="loan-details-value">{{ loanDetails.repaymentMethod }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch, defineProps } from 'vue';
  import { useStore } from '@/store';
  import { useRouter } from 'vue-router'
  import nav_bar from "@/layout/NavBar.vue";
  import { getLoanDetails } from '@/api/loan.js';

  const router = useRouter();
  const store = useStore();
  const response = ref(null);
  const loanId = ref(0);
  const barchartRef = ref(0);
  const monthlyRepaymentList = ref([]);
  const indexMaxMonthly = ref(0);
  const currentRepayment = ref({
    "id" : 0,
    "historyDate": "YYYY-MM",
    "interestRate" : 0,
    "repaymentAmount1": 0,
    "repaymentAmount2": 0,
    "repaymentAmount3": 0,
  });
  // onMounted(async () => {
  //   loanId.value = router.currentRoute.value.query.id;
  //   console.log(loanId.value);
  //   const res = await getLoanDetails(loanId.value);
  //   console.log(res);
  //   // response.value = res.data;
  // });
  function addIndex(index){
    if(indexMaxMonthly.value + index < 0 || indexMaxMonthly.value + index > monthlyRepaymentList.value.length - 1){
      return;
    }
    indexMaxMonthly.value += index;
    currentRepayment.value.historyDate = monthlyRepaymentList.value[indexMaxMonthly.value].historyDate;
    currentRepayment.value.interestRate = monthlyRepaymentList.value[indexMaxMonthly.value].interestRate;
    currentRepayment.value.repaymentAmount1 = monthlyRepaymentList.value[indexMaxMonthly.value].repaymentAmount1;
    currentRepayment.value.repaymentAmount2 = monthlyRepaymentList.value[indexMaxMonthly.value].repaymentAmount2;
    currentRepayment.value.repaymentAmount3 = monthlyRepaymentList.value[indexMaxMonthly.value].repaymentAmount3;
  }
  function minusIndex(index){
    if(indexMaxMonthly.value - index < 0 || indexMaxMonthly.value - index > monthlyRepaymentList.value.length - 1){
      return;
    }
    indexMaxMonthly.value -= index;
    currentRepayment.value.historyDate = monthlyRepaymentList.value[indexMaxMonthly.value].historyDate;
    currentRepayment.value.interestRate = monthlyRepaymentList.value[indexMaxMonthly.value].interestRate;
    currentRepayment.value.repaymentAmount1 = monthlyRepaymentList.value[indexMaxMonthly.value].repaymentAmount1;
    currentRepayment.value.repaymentAmount2 = monthlyRepaymentList.value[indexMaxMonthly.value].repaymentAmount2;
    currentRepayment.value.repaymentAmount3 = monthlyRepaymentList.value[indexMaxMonthly.value].repaymentAmount3;
  }

  const props = defineProps({
    loanDetails: Object,
  });
  onMounted(async () =>{
    setTimeout(() => {
      barchartRef.value.scrollLeft = barchartRef.value.scrollWidth;
    }, 500);
  })

  watch(() => props.loanDetails, (newVal) => {
    // console.log('✨', newVal);
    monthlyRepaymentList.value = newVal.repaymentHistoryMonthList;
    indexMaxMonthly.value = monthlyRepaymentList.value.length - 1;
    currentRepayment.value.id = indexMaxMonthly.value;
    currentRepayment.value.historyDate = monthlyRepaymentList.value[indexMaxMonthly.value].historyDate;
    currentRepayment.value.interestRate = monthlyRepaymentList.value[indexMaxMonthly.value].interestRate;
    currentRepayment.value.repaymentAmount1 = monthlyRepaymentList.value[indexMaxMonthly.value].repaymentAmount1;
    currentRepayment.value.repaymentAmount2 = monthlyRepaymentList.value[indexMaxMonthly.value].repaymentAmount2;
    currentRepayment.value.repaymentAmount3 = monthlyRepaymentList.value[indexMaxMonthly.value].repaymentAmount3;
    console.log(indexMaxMonthly.value, monthlyRepaymentList.value[monthlyRepaymentList.value.length - 1]);
  });
</script>

<style lang="scss" scoped>
  @import "@/style/common.scss";
  .loan-details-fragment {
    width: 328px;
    height: 190px;
    margin: 300px auto;
    &__container1{
      background-color: #fff;
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
      position: relative;
    }
    &__chart{
      // position: relative;
      width: 328px;
      height: 232px;
      border: 1px solid #DBDDE2;
      border-radius: 16px;
      overflow: auto;
      &-label{
        position: absolute;
        top: 48px;
        right: 12px;
        font-size: 12px;
        font-family: 'NanumSquareNeo_bold';
      }
      &-container{
        margin-top: 36px;
      }
      &-ul{
        display: flex;
        align-items: center;
        position: relative;
      }
      &-li{
        margin-left: 12px;
        margin-right: 12px;
      }
      &-total{
        position: absolute;
        top: 0;
      }
      &-graph{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        width: 20px;
        height: 100px;
        margin-top: 20px;
        border-radius: 4px 4px 0px 0px;
        overflow: hidden;
        &__principal{
          background: #031F84;
          height: 10px;
        }
        &__interest{
          background: #367BF9;
          height: 10px;
        }
        &__midterm{
          background: #FFAC08;
          height: 10px;
        }
      }
    }
    &__container3{
      position: relative;
    }
    &__info{
      width: 328px;
      height: 232px;
      // border: 1px solid #DBDDE2;
      // border-radius: 16px;
      &__container{
        display: flex;
        padding: 4px;
        > div{
          margin-left: 5px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: left;
        }
      }
    }
    &__chart-ul{
      display: flex;
      align-items: center;
      position: relative;
    }
  }
  .label{
    font-size: 18px;
    font-family: 'NanumSquareNeo_extraBold';
    color: #000000;
    margin: 24px 0 16px;
  }
  .line{
    width: 328px;
    height: 0px;
    border: 1px solid #F3F3F3;
  }
  .loan-details-label{
    color: $grey100;
    font-size: 18px;
    font-family: 'NamumSquareNeo_bold';
  }
  .loan-details-value{
    color: $grey60;
    font-size: 16px;
    font-family: 'NamumSquareNeo_normal';
  }
</style>