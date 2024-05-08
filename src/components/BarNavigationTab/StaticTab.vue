<template>
  <div class="hasdata-statistics__drawersContainer">
    <div :class="vb_statisticsDrawers">
      <div>
        <span>전체 대출 잔액</span>
        <span>총 상환 원금</span>
        <span>{{ vb_drawersTotalLoan }}</span>
        <span>{{ vb_drawersTotalRepayment }}</span>
      </div>
    </div>
  </div>
  <div :class="vb_statisticsDetails">
    <div>
      <div>
        <span>2023년 12월</span>
        <span>상환 예정</span>
        <div class="hasdata-statistics-details__main">
          <div>
            <img src="/src/assets/ic_bank.png" alt="icon" />
            <div>
              <div>
                <div class="hasdata-statistics-details__main__loan-purpose-student">학자금</div>
                <div>D-16</div>
              </div>
              <div>
                <div>카카오 학자금대출</div>
                <div>2024.12.18.</div>
              </div>
            </div>
          </div>
        </div>
        <div class="hasdata-statistics-details__main">
          <div>
            <img src="/src/assets/ic_bank.png" alt="icon" />
            <div>
              <div>
                <div class="hasdata-statistics-details__main__loan-purpose-living">생활비</div>
                <div>D-16</div>
              </div>
              <div>
                <div>토스뱅크 신용대출</div>
                <div>2024.12.18.</div>
              </div>
            </div>
          </div>
        </div>
        <hr style="margin-top:24px; width: 100%; "/>
        <div class="hasdata-statistics-details__main__finish">
          <span>상환 완료</span>
          <span>500,000원</span>
        </div>
        <div class="hasdata-statistics-details__main">
          <div>
            <img src="/src/assets/ic_bank.png" alt="icon" />
            <div>
              <div>
                <div class="hasdata-statistics-details__main__loan-purpose-finish">주택자금</div>
              </div>
              <div>
                <div>하나은행 전세자금대출</div>
                <div>500,000원</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr style="width:100%; height: 16px; border:none; background-color: #F7F8FA; margin-top: 16px;"/>
      <div>
        <span>월별 총 상환 그래프</span>
        <vuebarchart />
      </div>
      <span>대출 원금 비중</span>
      <div>
        <span>198,000,000원</span>
        <hr/>
        <div :class="vb_statisticsDetailsDoughnut">
          <vuepiechart />
        </div>
      </div>
    </div>

  </div>

</template>

<script lang="ts" setup>
  import vuepiechart from '@/components/ChartPie001.vue';
  import vuebarchart from '@/components/ChartBar001.vue';
  import { ref, onMounted } from 'vue';
  const vb_statisticsDrawers = ref('hasdata-statistics__drawers');
  const vb_statisticsDetails = ref('hasdata-statistics-details')
  const vb_statisticsDetailsDoughnut = ref('hasdata-statistics-details__doughnut')
  const vb_drawersTotalLoan = ref('')
  const vb_drawersTotalRepayment = ref('')
  const loanPurpose = ref('');
  const temp = ref('');
  const chartData = ref({
    // labels: [],
    datasets: [
      {
        label: [],
        backgroundColor: [ '#9F33C4',  '#FFCE58', '#89D8D8','#6B7583', '#3182F6' ],
        data: [],
      },
    ],
  });

  
  onMounted(async () => {
    try {
      const response = await fetch('https://www.freedom-day.site/api/test/loan-statistics');
      const fetchedData = await response.json();
      console.log(fetchedData);
      // vb_drawersTotalLoan.value = fetchedData['totalBalance'].toLocaleString() + "원";
      vb_drawersTotalLoan.value = fetchedData['totalBalance'] + "원";
      // vb_drawersTotalRepayment.value = fetchedData['totalPrincipalRepayment'].toLocaleString() + "원";
      vb_drawersTotalRepayment.value = fetchedData['totalPrincipalRepayment'] + "원";
      checkLoanPurpose();
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  });
  // console.log(chartData.value)
  function checkLoanPurpose() {
    // console.log(loanPurpose)
    if (loanPurpose.value === '학자금') {
      loanPurpose.value='hasdata-statistics-details__main__loan-purpose-student';
    } else if (temp.value === '생활비') {
      // 차 구매용도
      loanPurpose.value='hasdata-statistics-details__main__loan-purpose-living';
    } else {
      // 기타 용도
      loanPurpose.value='hasdata-statistics-details__main__loan-purpose-student';
      console.log('Loan for other purposes');
    }
  }
</script>


<style lang="scss">
  .hasdata-navbar__blue {
    display: flex;
    align-items: center;
    width: 100%;
    min-width: 348px;
    min-height: 56px;
    font-family: 'NanumSquareNeo_extrabold';
    font-size: 20px;
    background-color: #3C86FA;
    box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.25);
    > nav > button{
      background-color: #3C86FA;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
      margin-left: 16px;
    }
  }

  .hasdata-statistics{
    &__drawersContainer{
      width: 100%;
      height: 166px;
      background-color: #FFFFFF;
    }
    &__drawers {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 360px;
      min-height: 146px;
      background-color: #3C86FA;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 0px 0px 16px 16px;
      >div {
        display:grid;
        align-items: center;
        grid-template-columns: 1fr 1fr;
        min-width: 328px;
        min-height: 90px;
        background-color: #fff;
        background: #FFFFFF;
        border: 1px solid #E4E4E4;
        border-radius: 16px;
      }

      > div > span:nth-child(1) {
        font-size: 16px;
        margin-left: 13px;
        color:#898F9A;
        font-family: 'NanumSquareNeo_normal';
      }
      > div > span:nth-child(2) {
        font-size: 16px;
        margin-left: 13px;
        color:#898F9A;
        font-family: 'NanumSquareNeo_normal';
      }
      > div > span:nth-child(3) {
        font-size: 18px;
        font-family: 'NanumSquareNeo_heavy';
        text-align: center;
      }
      > div > span:nth-child(4) {
        font-size: 18px;
        font-family: 'NanumSquareNeo_heavy';
        text-align: center;
      }
    }

    &-details{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 50px;
      // &__doughnut{
      //   min-width: 272px;
      //   height: auto;
      //   object-fit: cover;
      // }
      // margin-top: 16px;
      > div > div:nth-child(1) > span:nth-child(2){
        margin-top: 16px;
        margin-bottom: 8px;
      }
      // 
      &__main{
        // background-color: orange;
        > div{
          display: flex;
          // background-color: orange;
        }
        // background-color: grey;
        margin-top:8px;
        > div > div {
          width: 100%;
          // background-color: orange;
          font-size: 12px;
          margin-left: 8px;
          
          >div:nth-child(1){
            // background-color: yellowgreen;
            display: flex;
          }
          >div:nth-child(2){
            // background-color: royalblue;
            display: flex;
            margin-top: 6px;
            >div:nth-child(1){
              width:100%;
              font-family: 'NanumSquareNeo_bold';
              font-size: 16px;
              // background-color: #FFF;
            }
            >div:nth-child(2){
              display: flex;
              justify-content: right;
              font-family: 'NanumSquareNeo_normal';
              font-size: 14px;
              color:#898F9A;
              // background-color: red;
            }
          }

          > div:nth-child(1) > div:nth-child(1){
            display:flex;
            width: 47px;
            height: 19px;
            align-items: center;
            justify-content: center;
            // background-color: #FFCE58;
            border-radius: 999px;
            margin-right: 4px;
            color: #FFFFFF;
          }
          > div:nth-child(1) > div:nth-child(2){
            display:flex;
            width: 47px;
            height: 19px;
            align-items: center;
            justify-content: center;
            background-color: #2B66F5;
            border-radius: 999px;
            margin-right: 4px;
            color: #FFFFFF;
          }
        } 
        > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2){
          min-width: 100px;
        }
        &__loan-purpose-student{
          background-color: #FFCE58;
        }
        &__loan-purpose-living{
          background-color: #9F33C4;
        }
        &__loan-purpose-finish{
          min-width: 58px;
          height: 19px;
          background-color: #3182F6;
        }
        &__finish{
          display: flex;
          justify-content: space-between;
          margin-top: 16px;
          font-family: 'NanumSquareNeo_normal';
          font-size: 16px;
          // font-size: 14px;
        }
      }  
      >div{
        // display: flex;
        // flex-direction: column;
        width: 100%;
        height: 100%;
        min-width: 328px;
        min-height: 274px;
        background-color: #FFFFFF;
        // border: 1px solid #DBDDE2;
        // border-radius: 16px;
        >span{
          font-size: 18px;
          font-family: 'NanumSquareNeo_extrabold';
          margin-left: 17px;
        }
        >div:nth-child(1){
          > div > span{
            font-size: 16px;
            font-family: 'NanumSquareNeo_extrabold';
          }
          // background-color: green;
          display:flex;
          flex-direction: column;

        }
        >div:nth-child(2){
          margin-top: 16px;
          // background-color: royalblue;
        }
        >div {
          background-color: #FFFFFF;
          margin-left: 16px;
          margin-right: 16px;
        }

        > div > span{
          font-size: 16px;
          font-family: 'NanumSquareNeo_extrabold';
        }
        > div > hr{
          width: 296px;
          border: 0;
          height: 1px;
          background-color: #F3F3F3;
        }
      }

    }
  }
  
</style>
