<template>
  <div class="loan-details-fragment">
    <div class="loan-details-fragment__container1">
      <p class="label">상환 세부 내용</p>
      <div class="loan-details-fragment__calendar">
        <div style="display:flex; width:195px; align-items: center;justify-content: space-between;">
          <img
            v-if = "isLeftArrow"
            src="@/assets/ic_24_left_grey80.svg" 
            alt="calendar" 
            style="width:24px; height: 24px;"
            @click="minusIndex"
            >
          <img
          v-else
          src="@/assets/ic_24_left_grey20.svg" 
          alt="calendar" 
          style="width:24px; height: 24px;"
          @click="minusIndex"
          >
          <p style="text-decoration: underline;text-underline-offset: 3px;text-decoration-thickness: 1px;font-family: 'NanumSquareNeo_bold';">{{ currentRepayment.historyDate.replace('-','.') }}</p>
          <!-- <ul>
            <li v-for="data in monthlyRepaymentList" :key="data.id">{{ data.historyDate }}</li>
          </ul> -->
          <img 
            v-if="isRightArrow"
            id="arrow-right"
            src="@/assets/ic_24_right_grey80.svg" 
            alt="calendar" 
            style="width:24px; height: 24px;" 
            @click="addIndex"
            >
          <img 
            v-else
            id="arrow-right"
            src="@/assets/ic_24_right_grey20.svg" 
            alt="calendar" 
            style="width:24px; height: 24px;" 
            @click="addIndex"
            >
        </div>
        <div 
          style="position:relative; display:flex; flex-direction:column; justify-content: space-evenly;align-items: center; height: 210px;box-sizing: border-box;"
          v-if="currentRepayment.repaymentAmount1 + currentRepayment.repaymentAmount2 + currentRepayment.repaymentAmount3 == 0"
          >
          <div 
            :style="{position:'absolute', top:'8px', display:isDisplayVisible, backgroundColor: '#FFF', width: '296px', height: '200px'}"
            >
            <div style="background-color: #F3F3F3; border-radius: 10px; box-sizing: border-box;padding:8px;">
              <form>
                <div style="display: flex; flex-direction: column; align-items:center; font-size: 14px; font-family: 'NanumSquareNeo_bold';">
                  <div style="margin:4px auto 4px; position:relative;display: flex; justify-content: right; align-items: center; width: 100%">
                    <span style="position:absolute;left:0;">금리</span>
                    <input type="text" style="margin-right:4px;width: 180px; height: 30px; border: 1px solid #DBDDE2; border-radius: 8px; padding: 8px; box-sizing: border-box;" v-model="currentRepayment.interestRate">
                    <span>%</span>
                  </div>
                  <div style="margin:4px auto 4px; position:relative;display: flex; justify-content: right; align-items: center; width: 100%">
                    <span style="position:absolute;left:0;">이자</span>
                    <input type="text" style="margin-right:4px;width: 180px; height: 30px; border: 1px solid #DBDDE2; border-radius: 8px; padding: 8px; box-sizing: border-box;" v-model="currentRepayment.interestRate">
                    <span>원</span>
                  </div>
                  <div style="margin:4px auto 4px; position:relative;display: flex; justify-content: right; align-items: center; width: 100%">
                    <span style="position:absolute;left:0;">원금</span>
                    <input type="text" style="margin-right:4px;width: 180px; height: 30px; border: 1px solid #DBDDE2; border-radius: 8px; padding: 8px; box-sizing: border-box;" v-model="currentRepayment.interestRate">
                    <span>원</span>
                  </div>
                  <div style="margin:4px auto 4px; position:relative;display: flex; justify-content: right; align-items: center; width: 100%">
                    <span style="position:absolute;left:0;">중도상환</span>
                    <input type="text" style="margin-right:4px;width: 180px; height: 30px; border: 1px solid #DBDDE2; border-radius: 8px; padding: 8px; box-sizing: border-box;" v-model="currentRepayment.interestRate">
                    <span>원</span>
                  </div>
                </div>
              </form>
            </div>
            <div style="display:flex; justify-content: right;box-sizing: border-box;">
              <button
                @click="displayVisible"
                style="color:#898F9A;font-size:12px; font-family:'NanumSquareNeo_extrabold';width:62px;height:40px;border: 1px solid #898F9A;border-radius: 16px;"
                >
                취소
              </button>
              <button
                @click="displayVisible"
                style="color:#FFFFFF;background-color:#2B66F5;font-size:12px; font-family:'NanumSquareNeo_extrabold';width:62px;height:40px;border-radius: 16px;"
                >
                확인
              </button>
            </div>
          </div>
          <img src="@/assets/ic_haebang_56.svg" alt="calendar" style="width:56px; height: 56px;">
          <p style="font-size:18px; font-family: 'NanumSquareNeo_bold';">이번 달도 상환 하셨나요?</p>
          <button
            @click="displayVisible" 
            class="loan-details-fragment__calendar-write"
            >
            네! 상환 입력하기
          </button>
          <!-- <form method="POST" @submit.prevent="handleSubmit">
          </form> -->
        </div>
        <div 
          v-if="currentRepayment.repaymentAmount1 + currentRepayment.repaymentAmount2 + currentRepayment.repaymentAmount3 != 0" style="height: 126px; width:296px; background: #F3F3F3; border-radius: 10px;padding: 16px; box-sizing:border-box;display:flex; flex-direction: column; justify-content:space-between;">
          <p style="display: flex; justify-content: space-between; font-size: 14px; font-family: 'NanumSquareNeo_bold';">
            <span>금리</span>
            <span style="font-family: 'NanumSquareNeo_extrabold';">{{ currentRepayment.interestRate }} %</span>
          </p>
          <p style="display: flex; justify-content: space-between; font-size: 14px; font-family: 'NanumSquareNeo_bold';">
            <span>이자</span>
            <span style="font-family: 'NanumSquareNeo_extrabold';">{{ currentRepayment.repaymentAmount1.toLocaleString() }} 원</span>
          </p>
          <p style="display: flex; justify-content: space-between; font-size: 14px; font-family: 'NanumSquareNeo_bold';">
            <span>원금</span>
            <span style="font-family: 'NanumSquareNeo_extrabold';">{{ currentRepayment.repaymentAmount2.toLocaleString() }} 원</span>
          </p>
          <p style="display: flex; justify-content: space-between; font-size: 14px; font-family: 'NanumSquareNeo_bold';">
            <span>중도상환</span>
            <span style="font-family: 'NanumSquareNeo_extrabold';">{{ currentRepayment.repaymentAmount3.toLocaleString() }} 원</span>
          </p>
        </div>
        <div
          v-if="currentRepayment.repaymentAmount1 + currentRepayment.repaymentAmount2 + currentRepayment.repaymentAmount3 != 0" 
          style="width:296px; height:76px; box-sizing: border-box;display: flex;box-sizing: border-box; padding:16px;align-items: center;justify-content: space-between;background: #EAF0FE;border-radius: 10px;">
          <div style="display:flex; flex-direction: column;">
            <p style="font-size:12px; font-family: 'NanumSquareNeo_bold';">{{currentRepayment.historyDate.toString().split('-')[1]}}월 납입금액</p>
            <p style="font-size:20px; font-family: 'NanumSquareNeo_extrabold';margin-top: 4px;">{{Number.parseInt(currentRepayment.repaymentAmount1 + currentRepayment.repaymentAmount2 + currentRepayment.repaymentAmount3).toLocaleString()}}원</p>
          </div>
          <div 
            style="border: 1px solid #2B66F5;border-radius: 16px;background: #FFFFFF;box-sizing: border-box;width: 94px;height: 40px;font-size: 14px;font-family: 'NanumSquareNeo_extrabold'; text-align: center;line-height: 40px;color:#2B66F5;"
            @click="displayVisible"
            >
            수정하기
          </div>
        </div>
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
  import { getLoanDetails, setAddRepaymentDetails } from '@/api/loan.js';

  const router = useRouter();
  const store = useStore();
  const response = ref(null);
  const loanId = ref(0);
  const barchartRef = ref(0);
  const monthlyRepaymentList = ref([]);
  const indexMaxMonthly = ref(0);
  const currentYear = ref(null);
  const currentMonth = ref(null);
  const currentRepayment = ref({
    "id" : 0,
    "historyDate": "YYYY-MM",
    "interestRate" : 0,
    "repaymentAmount1": 0,
    "repaymentAmount2": 0,
    "repaymentAmount3": 0,
  });
  const isRightArrow = ref(false);
  const isLeftArrow = ref(false);
  const isDisplayVisible = ref('none'); //상환세부내용 입력
  function displayVisible() {
    if (isDisplayVisible.value == 'none'){
      isDisplayVisible.value = 'block';
    }else{
      isDisplayVisible.value = 'none';
    }
  }
  // onMounted(async () => {
  //   loanId.value = router.currentRoute.value.query.id;
  //   console.log(loanId.value);
  //   const res = await getLoanDetails(loanId.value);
  //   console.log(res);
  //   // response.value = res.data;
  // });
  function addIndex(){
    isLeftArrow.value = true; // 오른쪽 누른 순간 왼쪽 화살표는 무조건 true
    if(currentRepayment.value.id + 1 > monthlyRepaymentList.value.length - 1){
      return;
    }
    currentRepayment.value.id += 1;
    currentRepayment.value.historyDate = monthlyRepaymentList.value[currentRepayment.value.id].historyDate;
    currentRepayment.value.interestRate = monthlyRepaymentList.value[currentRepayment.value.id].interestRate;
    currentRepayment.value.repaymentAmount1 = monthlyRepaymentList.value[currentRepayment.value.id].repaymentAmount1;
    currentRepayment.value.repaymentAmount2 = monthlyRepaymentList.value[currentRepayment.value.id].repaymentAmount2;
    currentRepayment.value.repaymentAmount3 = monthlyRepaymentList.value[currentRepayment.value.id].repaymentAmount3;
    if(currentRepayment.value.id == monthlyRepaymentList.value.length - 1){
      isRightArrow.value = false;
    }else{
      isRightArrow.value = true;
    }
  }
  function minusIndex(){
    
    isRightArrow.value = true; // 왼쪽 누른 순간 오른쪽 화살표는 무조건 true
    if(currentRepayment.value.id - 1 < 0 ){
      return;
    }
    currentRepayment.value.id -= 1;
    currentRepayment.value.historyDate = monthlyRepaymentList.value[currentRepayment.value.id].historyDate;
    currentRepayment.value.interestRate = monthlyRepaymentList.value[currentRepayment.value.id].interestRate;
    currentRepayment.value.repaymentAmount1 = monthlyRepaymentList.value[currentRepayment.value.id].repaymentAmount1;
    currentRepayment.value.repaymentAmount2 = monthlyRepaymentList.value[currentRepayment.value.id].repaymentAmount2;
    currentRepayment.value.repaymentAmount3 = monthlyRepaymentList.value[currentRepayment.value.id].repaymentAmount3;
    if(currentRepayment.value.id == 0){
      isLeftArrow.value = false;
    }else{
      isLeftArrow.value = true;
    }
  }

  const handleSubmit = async () =>{
    try{
      alert('상환 입력!');
      // await setAddRepaymentDetails({
      //   // loanId: router.currentRoute.value.query.id,
      //   // interestRate: currentRepayment.value.interestRate,
      //   // historyDate: currentRepayment.value.historyDate,
      //   // repaymentAmount1: currentRepayment.value.repaymentAmount1,
      //   // repaymentAmount2: currentRepayment.value.repaymentAmount2,
      //   // repaymentAmount3: currentRepayment.value.repaymentAmount3,
      //   // 상환 1, 2, 3 합쳐서 outStandingPrincipal보다 크면 에러
      //   // const totalRepay = 
      //   // if (router.currentRoute.value.query.outstandingPrincipal > ){

      //   // }
      //   loanId: router.currentRoute.value.query.id,
      //   interestRates: 6.2,
      //   repaymentAmount1: 1000000,
      //   repaymentAmount2: 1000000,
      //   repaymentAmount3: 2000000,
      //   historyDate: '2024-05-16',
      // });

      // router.push("/home");
    }catch(e){
      console.log(e);
    }
  }


  const props = defineProps({
    loanDetails: Object,
  });
  onMounted(async () =>{
    try{
      setTimeout(() => {
        barchartRef.value.scrollLeft = barchartRef.value.scrollWidth;
      }, 500);
      isLeftArrow.value = true;
      let year = new Date().getFullYear();
      let month = (new Date().getMonth()) + 1;
      currentMonth.value = month < 10 ? '0' + month : month.toString();
      currentYear.value = year.toString();
      // console.log(currentMonth.value);

      watch(() => props.loanDetails, (newVal) => {
        monthlyRepaymentList.value = newVal.repaymentHistoryMonthList;
        indexMaxMonthly.value = monthlyRepaymentList.value.length - 1;
        const maxMonth = monthlyRepaymentList.value[indexMaxMonthly.value].historyDate.toString().split('-')[1];
        console.log('api: ',monthlyRepaymentList.value);
        if(Number.parseInt(maxMonth.toString().replace('0',''))+1 == Number.parseInt(currentMonth.value.toString().replace('0',''))){
          console.log('캬캬캬', maxMonth, currentMonth.value); 
          monthlyRepaymentList.value.push({
            "historyDate": `${currentYear.value}-${currentMonth.value}`,
            "interestRate": 0,
            "repaymentAmount1": 0,
            "repaymentAmount2": 0,
            "repaymentAmount3": 0,
          });
          indexMaxMonthly.value += 1;
        }else{
          console.log('api에서 현재 월까지 데이터 읽어옴');
        }
        currentRepayment.value.id = indexMaxMonthly.value;
        currentRepayment.value.historyDate = monthlyRepaymentList.value[indexMaxMonthly.value].historyDate;
        currentRepayment.value.interestRate = monthlyRepaymentList.value[indexMaxMonthly.value].interestRate;
        currentRepayment.value.repaymentAmount1 = monthlyRepaymentList.value[indexMaxMonthly.value].repaymentAmount1;
        currentRepayment.value.repaymentAmount2 = monthlyRepaymentList.value[indexMaxMonthly.value].repaymentAmount2;
        currentRepayment.value.repaymentAmount3 = monthlyRepaymentList.value[indexMaxMonthly.value].repaymentAmount3;
        console.log('max date: ',currentRepayment.value.historyDate);
      })
      // console.log(props.loanDetails);
      // await setAddRepaymentDetails({
      //   loanId: router.currentRoute.value.query.id,
      //   historyDate: currentRepayment.value.historyDate,
      //   interestRate: currentRepayment.value.interestRate,
      //   repaymentAmount1: currentRepayment.value.repaymentAmount1,
      //   repaymentAmount2: currentRepayment.value.repaymentAmount2,
      //   repaymentAmount3: currentRepayment.value.repaymentAmount3,
      // });
      // await setAddRepaymentDetails({
      //   loanId: router.currentRoute.value.query.id,
      //   interestRate: 6.2,
      //   repaymentAmount1: 100000,
      //   repaymentAmount2: 200000,
      //   repaymentAmount3: 300000,
      //   historyDate: '2024-05-16',
      // });
    }catch(e){
      console.log(e);
    }
  })


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
        margin-top: 24px;
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
    font-family: 'NanumSquareNeo_extrabold';
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
    font-family: 'NanumSquareNeo_bold';
  }
  .loan-details-value{
    color: $grey60;
    font-size: 16px;
    font-family: 'NanumSquareNeo_normal';
  }
</style>