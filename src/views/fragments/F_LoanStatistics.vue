<template>
  <div class="loan-statistics" >
    <div class="loan-statistics-remind">
      <p class="loan-statistics-remind__currentDate" style="font-family:'NanumSquareNeo_extrabold'; font-size: 18px;">{{ currentDate }}</p>
      <p class="loan-statistics-remind__due">상환 예정</p>
      <ul>
        <li v-for="loan in loanList" :key="loan.id">
          <div class="loan-statistics-remind-card">
            <img class="loan-statistics-remind-card__bankimg" src="@/assets/ic_bank.png" alt="">
            <div class="loan-statistics-remind-card-info">
              <p class="loan-statistics-remind-card-info__purpose">{{ loan.purpose }}</p>
              <p class="loan-statistics-remind-card-info__dday">D-{{ loan.paymentDDay }}</p>
            </div>
            <p class="loan-statistics-remind-card__name">{{ loan.name }}</p>
            <p class="loan-statistics-remind-card__duedate">{{ loan.paymentDate }}</p>
          </div>
        </li>
      </ul>
      <div style="width: 328px; height: 0px; border: 1px solid #F3F3F3; margin: 24px auto 16px "></div>
      
      <div class="loan-statistics-finish">
        <div class="loan-statistics-finish__container">
          <p class="loan-statistics-finish__container__label">상환 완료</p>
          <p class="loan-statistics-finish__conainer__amount">{{finishRepayment}}원</p>
        </div>
        <ul>
          <li v-for="finish in loanFinishList" :key="finish.id">
            <div class="loan-statistics-finish-card">
              <img class="loan-statistics-finish-card__bankimg" src="@/assets/ic_bank.png" alt="">
              <p class="loan-statistics-finish-card__purpose">{{ finish.purpose }}</p>
              <p class="loan-statistics-finish-card__name">{{ finish.name }}</p>
              <p class="loan-statistics-finish-card__amount">{{ finish.repaymentAmount }}원</p>        
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div style="background-color: #F7F8FA; width:100%; height:16px; margin:24px auto 32px; box-sizing: border-box;"></div>
    <!-- loan-statistics-barchart 클래스 내에서만 스크롤이 되어야하고 화면 전체는 가로축 스크롤이 되면 안된다. -->
    <div class="loan-statistics-barchart" >
      <p class="loan-statistics-barchart__label" style="font-family:'NanumSquareNeo_extrabold'; font-size: 18px;">월별 총 상환 그래프</p>
      <div class="loan-statistics-barchart__chart" style="overflow:auto;border: 1px solid #DBDDE2;border-radius: 16px; width:95%; height:230px; margin:0 auto;" ref="barchartRef">
        <div class="loan-statistics-barchart__chart-label">(단위:천원)</div>
        <!-- 아래 v-for -->
        <div class="loan-statistics-barchart__chart-container">
          <ul class="loan-statistics-barchart__chart-ul">
            <!-- 최대 10억, 1만원 당 1px -->
            <li v-for="month in monthlyRepaymentList" :id="month.id" class="loan-statistics-barchart__chart-li">
              <div>
                <div class="loan-statistics-barchart__chart-total">{{ (month.repaymentAmount1 + month.repaymentAmount2 + month.repaymentAmount3) / 1000 }}</div>
                <div class="loan-statistics-barchart__chart-graph">
                  <div class="loan-statistics-barchart__chart-graph__midterm" :style="{'height':  (month.repaymentAmount3 / 1000) + 'px' }" ></div>
                  <div class="loan-statistics-barchart__chart-graph__interest" :style="{'height': (month.repaymentAmount2 / 1000) + 'px'}"></div>
                  <div class="loan-statistics-barchart__chart-graph__principal" :style="{'height': (month.repaymentAmount1 / 1000) + 'px'}"></div>
                </div>
                <!-- month.historyDate는 YYYY-MM 포맷인데, YY.MM으로 변경 -->
                <div class="loan-statistics-barchart__chart-date">{{ month.historyDate.slice(2).replace('-', '.') }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p class="loan-statistics-piechart__label" style="font-family:'NanumSquareNeo_extrabold'; font-size: 18px;">대출 원금 비중</p>
    <div class="loan-statistics-piechart">
      <div class="loan-statistics-piechart__total-principal">
        <p class="loan-statistics-piechart__total-principal__label">남은 총 원금</p>
        <p class="loan-statistics-piechart__total-principal__amount">{{totalRemainingPrincipal}}원</p>
      </div>
      <div class="loan-statistics-piechart__chart"  :style="pieChart">
        <!-- <div class="loan-statistics-piechart__chart__item" style="background-color: #9F33C4; height: 20%;"></div> -->
        <!-- <div class="loan-statistics-piechart__chart__item" style="background-color: #FFCE58; height: 20%;"></div> -->
        <!-- <div class="loan-statistics-piechart__chart__item" style="background-color: #89D8D8; height: 20%;"></div> -->
        <!-- <div class="loan-statistics-piechart__chart__item" style="background-color: #6B7583; height: 20%;"></div> -->
        <!-- <div class="loan-statistics-piechart__chart__item" style="background-color: #3182F6; height: 20%;"></div> -->
      </div>
      <!-- angle은 1% * 3.6 -->
      <div class="loan-statistics-piechart__legend">
        <!-- (5 * 3.6) / 2  - 90 -->
        <div class="legend-item" style="--angle: -100deg">
          <!-- <span class="legend-color" style="background-color: #9F33C4;"></span> -->
          <p class="legend-label" style="transform: rotate(100deg)">생활비 5%</p>
        </div>
        <!-- 18 + (10 * 3.6 / 2) -90 -->
        <div class="legend-item" style="--angle: -54deg">
          <!-- <span class="legend-color" style="background-color: #FFCE58;"></span> -->
          <p class="legend-label" style="transform: rotate(54deg)">학자금 10%</p>
        </div>
        <!-- 54 + (5 * 3.6 / 2) -90 -->
        <div class="legend-item" style="--angle: -27deg">
          <p class="legend-label" style="transform: rotate(27deg)">학자금 5%</p>
        </div>
        <!-- 72 + (30 * 3.6 / 2) -90 -->
        <div class="legend-item" style="--angle: 36deg">
          <p class="legend-label" style="transform: rotate(-36deg)">기타 30%</p>
        </div>
        <!-- 180 + (50 * 3.6 / 2) -90 -->
        <div class="legend-item" style="--angle: 180deg">
          <p class="legend-label" style="transform: rotate(-180deg)">주택자금 50%</p>
        </div>
        <!-- 추가적인 범례 아이템 -->
      </div>
    </div>
  </div>
</template>

<script setup>
// pichart 공식 (5 * 3.6) / 2  - 90deg
// 5% 미만이 3개 정도 나온다 가정 하, 20% 이상되는 값들에서 조정
  import { useStore } from '@/store/index.ts';
  import { ref, onMounted, computed, watch, defineProps, watchEffect} from "vue";
  import { getLoanStatistics } from '@/api/loan.js';

  // #9F33C4 0% 5%,  /* 생활비 */
  // #FFCE58 5% 15%, /* 학자금 */
  // #89D8D8 15% 20%, /* 자동차 */
  // #6B7583 20% 50%, /* 기타 */
  // #3182F6 50% 100%, /* 주택자금 */

  const store = useStore();
  const response = ref('');
  const totalPrincipal = ref(0);
  const totalPrincipalRepayment = ref(0);
  const loanList = ref([]);
  const emit = defineEmits(['response']);
  const currentDate = ref('');
  const barchartRef = ref(null);
  const finishRepayment = ref(0);
  const loanFinishList = ref([]);
  const monthlyRepaymentList = ref([]);
  const totalRemainingPrincipal = ref(0);
  const remainingPrincipalList = ref([]);
  const originalPercentList = ref([]); // 대출 원금 비중 계산용
  const adjustedPercentList = ref([]);
  const appendingList = ref([]); // listAppending Function 전용
  const colors = {
    '생활비': '#9F33C4',
    '학자금': '#FFCE58',
    '자동차': '#89D8D8',
    '주택자금': '#3182F6',
    '기타': '#6B7583',
  };
  const pieChart = computed(() => {
    let gradient = 'conic-gradient(';
    let accumulatedPercent = 0;
    for (let i = 0; i < appendingList.value.length; i++){
      const startPercent = accumulatedPercent;
      const endPercent = accumulatedPercent + appendingList.value[i].adjustPercent;
      gradient += `${colors[appendingList.value[i].purpose]} ${startPercent}% ${endPercent}%`;
      if (i < appendingList.value.length - 1){
        gradient += ',';
      }
      accumulatedPercent = endPercent;
    }
    gradient += ')';
    return {background: gradient};
  });
  




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
        loanList.value = res.response.loanList;
        loanFinishList.value = res.response.repaidLoanList;
        monthlyRepaymentList.value = res.response.repaymentHistoryMonthList;
        totalRemainingPrincipal.value = res.response.totalRemainingPrincipal.toLocaleString();
        remainingPrincipalList.value = res.response.remainingPrincipalList;
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // JavaScript의 getMonth()는 0부터 시작하므로 1을 더해줍니다.
        currentDate.value = `${year}년 ${month}월`;
        console.log('%c✨getLoanStatistics: ', 'color:#e34034;font-weight: bold;',res.response);

        // 상환완료 총액 계산
        for (let i = 0; i < res.response.repaidLoanList.length; i++){
          finishRepayment.value += res.response.repaidLoanList[i].repaymentAmount;
          res.response.repaidLoanList[i].repaymentAmount = res.response.repaidLoanList[i].repaymentAmount.toLocaleString();
        }

        finishRepayment.value = finishRepayment.value.toLocaleString();
        // console.log('%c✨loanFinishList: ', 'color:#e34034;font-weight: bold;',loanFinishList.value);
        // console.log('%c✨상환완료: ', 'color:#e34034;font-weight: bold;',finishRepayment.value);
        // pichart(res.response.remainingPrincipalList);
        originalPercentList.value = getPercentList(res.response.remainingPrincipalList);
        console.log('✨originalPercentList:', originalPercentList.value);
        adjustedPercentList.value = getAdjustPercentList(originalPercentList.value);
        console.log('✨adjustedPercentList:', adjustedPercentList.value);
        
        appendingList.value = listAppending(remainingPrincipalList.value, adjustedPercentList.value);
        console.log(`📌${appendingList['value'][0]['adjustPercent']}`);
        console.log('👌appendingList', appendingList.value);
        // getDeg(adjustedPercentList.value);

        barchartRef.value.scrollLeft = barchartRef.value.scrollWidth;
      });
    }catch(error){
      console.log('에러발생', error);
    }
  });


  const props = defineProps({
    msg: Number,
    isExpanded: Boolean
  });

  function getPercentList(remainingList){
    const percentList = [];
    let _totalRemainingPrincipal = remainingList.reduce((total, loan) => total + loan.remainingPrincipal, 0);

    for (let i = 0; i < remainingList.length; i++){
      let per = (remainingList[i].remainingPrincipal / _totalRemainingPrincipal) * 100;
      percentList.push(per);
    }
    return percentList;    
  }

  function getAdjustPercentList(originalPercentList){
    const minThreshold = 5.0; // 최소 표현 비율
    const increaseTo = 5.0;
    const total = originalPercentList.reduce((sum, val) => sum + val, 0);
    console.log('✨total:', total);
    // 5% 미만 값을 5%로 상향 조정
    const adjustedValues = originalPercentList.map(value =>{
      return(value / total * 100 < minThreshold ) ? (increaseTo * total / 100) : value;
    });
    // 상향 조정된 총합 계산
    const adjustedTotal = adjustedValues.reduce((sum, val) => sum + val, 0);
    const scaleDownFactor = total / adjustedTotal;
    // 모든 값 비례 축소
    return adjustedValues.map(value => value * scaleDownFactor);
  }

  // input: remainingPrincipalList
  function listAppending(list, adjustedPercentList){
    const appendingList = list;
    const adjPercentList = adjustedPercentList;

    for ( let [index, item] of list.entries()){
        appendingList[index]['adjustPercent'] = adjPercentList[index];
    }
    return appendingList;
  }

  function getDeg(adjustedPercentList){
    for (let i = 0; i < adjustedPercentList.length; i++){
      let angle = ((adjustedPercentList[i] * 3.6) / 2 - 90) + 'deg';
      console.log('✨angle:',i, angle);
    }
  }


  //input: remainingPrincipalList
  //output: degreeList e.g. [-81deg, -54deg, -27deg, 36deg, 180deg]
  function pichart(remainingList){
    console.log(remainingList);
    // remainingList.remainingPrincipalList[i].remainingPrincipal를 합산한 값
    let totalRemainingPrincipal = remainingList.reduce((total, loan) => total + loan.remainingPrincipal, 0);
    console.log(totalRemainingPrincipal);
    //totalRemainingPrincipal 값에서 5 미만은 5로 만들고 조정하는 알고리즘 추천해줘.
    
    const angleList = [];
    for (let i = 0; i < remainingList.length; i++){
      let per = remainingList[i].remainingPrincipal / totalRemainingPrincipal * 100
      console.log('✨percent:',i, per);
      let angle = ((per * 3.6) / 2 - 90) + 'deg';
      angleList.push(angle);
    }
    console.log(angleList);
  }

</script>

<style lang="scss" scoped>
  @import "@/style/common.scss";
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
        height: 48px;
        margin-bottom: 8px;
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
          color: #FFF;
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
          color: #FFF;
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

    &-finish{
      &__container{
        display: flex;
        justify-content: space-between;
        margin : 0 16px 16px;
      }
      &__container__label{
        font-size: 16px;
        font-family: 'NanumSquareNeo_bold';
      }
      &__container__amount{
        font-size: 16px;
        font-family: 'NanumSquareNeo_bold';
      }
      &-card{
        position: relative;
        width: 100vw;
        height: 48px;
        margin: 16px 0;
      }
      &-card__bankimg{
        position: absolute;
        top: 0;
        left: 16px;
        width: 48px;
        height: 48px;
      }
      &-card__purpose{
        position: absolute;
        top: 3.5px;
        left: 72px;
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
        color: #FFF;
        box-sizing: border-box;
      }
      &-card__name{
        position: absolute;
        bottom: 3.5px;
        left: 72px;
        font-size:16px;
        font-family: 'NanumSquareNeo_bold';
        color:#898F9A;
      }
      &-card__amount{
        position: absolute;
        bottom: 3.5px;
        right: 16px;
        font-size:14px;
        font-family: 'NanumSquareNeo_normal';
        color: $gray-common;
      }
    }

    &-barchart{
      position: relative;
      margin-bottom: 24px;
      &__label{
        font-size: 16px;
        font-family: 'NanumSquareNeo_bold';
        margin-left: 16px;
        margin-bottom: 16px;
      }
      &__chart-container{
        margin-top: 36px;
      }
      &__chart-ul{
        display: flex;
        align-items: center;
      }
      &__chart-li{
        margin-left: 19px;
        margin-right: 19px;
      }
      &__chart-label{
        position: absolute;
        top: 48px;
        right: 12px;
        font-size: 12px;
        font-family: 'NanumSquareNeo_bold';
      }
      &__chart-graph{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        width: 20px;
        height: 100px;
        // background: #FFF;
        // border-radius: 4px 4px 0px 0px;
        // z-index: 100;
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
      &__chart-date{
        font-size: 12px;
        font-family: 'NanumSquareNeo_normal';
        margin-top: 8px;
      }
    }
    &-piechart{
      margin: 0 auto;
      width: 95%;
      height: 274px;
      border: 1px solid #DBDDE2;
      border-radius: 16px;
      position: relative;
      &__label{
        font-size: 16px;
        font-family: 'NanumSquareNeo_bold';
        margin-left: 16px;
        margin-bottom: 16px;
      }
      &__chart{
        position: absolute;
        top: 20%;
        left: 20%;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        // background: conic-gradient(
        //   #9F33C4 0% 5%,  /* 생활비 */
        //   #FFCE58 5% 15%, /* 학자금 */
        //   #89D8D8 15% 20%, /* 자동차 */
        //   #6B7583 20% 50%, /* 기타 */
        //   #3182F6 50% 100%, /* 주택자금 */
        // );
      }
      &__legend{
        margin: 0 auto;
        position: absolute;
        top: 0;
        left: 0;
        width: 95%;
        height: 274px;
        // display: flex;
        // flex-direction: row;
        // justify-content: space-around;
        // padding: 10px 0;
      }
      &__total-principal{
        position: absolute;
        top: 16px;
        left: 16px;
        &__amount{
          font-size: 16px;
          font-family: 'NanumSquareNeo_extrabold';
          color: #565D69;
        }
      }
    }
    .legend-item {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50%;
      height: 20px;
      transform: translate(-60%, 50%) rotate(var(--angle)) translateX(66%) ;
      text-align: right;
      // transform-origin: 50% 50%;
    }

    .legend-color {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }

    .legend-label {
      color: #565D69;
      font-family: 'NanumSquareNeo_extrabold';
      font-size: 14px;
    }
  }
</style>