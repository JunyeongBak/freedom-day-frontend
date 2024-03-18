<template>
  <div :class="vb_statisticsDrawers">
    <div>
      <span>전체 대출 잔액</span>
      <span>총 상환 원금</span>
      <span>28,000,000원</span>
      <span>28,000,000원</span>
    </div>
  </div>
  <div :class="vb_statisticsDetails">
    <div>
      <span>대출 원금 비중</span>
      <div>
        <span>198,000,000원</span>
        <hr/>
        <div :class="vb_statisticsDetailsDoughnut">
          <piechart />
          <!-- <Doughnut  :data="chartData" :options="chartOptions" /> -->
        </div>
      </div>
    </div>

  </div>

</template>

<script lang="ts" setup>
  import piechart from '@/components/piechart.vue';
  import { ref, onMounted, computed, defineComponent } from 'vue';
  // import { Doughnut } from 'vue-chartjs';
  // import { Chart as ChartJS, ChartType, ArcElement, Tooltip, Legend } from 'chart.js';
  // ChartJS.register(ArcElement, Tooltip, Legend);
  // import axios from 'axios';
  const vb_statisticsDrawers = ref('hasdata-statistics__drawers');
  const vb_statisticsDetails = ref('hasdata-statistics-details')
  const vb_statisticsDetailsDoughnut = ref('hasdata-statistics-details__doughnut')
  // const vb_statisticsDetailsPichart = ref('hasdata-statistics-details__pichart')
  const chartData = ref({
    labels: [],
    datasets: [
      {
        backgroundColor: [ '#9F33C4',  '#FFCE58', '#89D8D8','#6B7583', '#3182F6' ],
        data: [],
      },
    ],
  });
  const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  });
  
  onMounted(async () => {
    try {
      const response = await fetch('https://www.freedom-day.site/api/test/graph1');
      // const response = await fetch('');
      const fetchedData = await response.json();
      const data = fetchedData['response']; // Make sure this path matches your data structure
      chartData.value.labels = data.map((item: any) => item.name);
      chartData.value.datasets[0].data = data.map((item: any) => item.amount);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  });
  console.log(chartData.value)
  // console.log(chartData.value.labels)
  // console.log(chartData.value.datasets[0].data)
</script>


<style lang="scss">
  // store의 state에 따라 /Home/index.vue navbar의 속성 변경. 
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
      // color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
      margin-left: 16px;
    }
  }

  .hasdata-statistics{
    &__drawers {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 360px;
      min-height: 166px;
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
        // margin: 0 16px 24px 16px;
      }

      > div > span:nth-child(1) {
        font-size: 16px;
        margin-left: 13px;
      }
      > div > span:nth-child(2) {
        font-size: 16px;
        margin-left: 13px;
      }
      > div > span:nth-child(3) {
        font-size: 18px;
        font-family: 'NanumSquareNeo_heavy';
        text-align: center;
        // margin-left: 13px;
      }
      > div > span:nth-child(4) {
        font-size: 18px;
        font-family: 'NanumSquareNeo_heavy';
        text-align: center;
      }
    }

    &-details{
      // position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      // background-color: orange;
      align-items: center;
      justify-content: center;
      &__doughnut{
        // display: flex;
        // align-items: center;
        // justify-content: center;
        min-width: 272px;
        height: auto;
        object-fit: cover;
        // position: absolute;
        // min-width: 360px;
        // min-height: 360px;
        // max-width: 600px;
        // max-height: 600px;
        // left:0px;
        // z-index: 1;
        // margin-right: 1px;
      }
      >div{
        width: 100%;
        height: 100%;
        min-width: 328px;
        min-height: 274px;
        background-color: #FFFFFF;
        border: 1px solid #DBDDE2;
        border-radius: 16px;

        >span{
          font-size: 18px;
          font-family: 'NanumSquareNeo_extrabold';
          margin-left: 17px;
        }
        >div{
          margin-left: 17px;
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
