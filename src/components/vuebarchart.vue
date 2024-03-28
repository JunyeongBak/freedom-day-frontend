<template>
    <div class="monthly">
      <div>
        <span>(단위:천원)</span>
      </div>
      <div class="total">
        <span>700</span>
        <span>250</span>
        <span>700</span>
        <span>700</span>
        <span>700</span>
      </div>
      <canvas id="barChart" width="380" height="230"></canvas>
    </div>
  </template>
  
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { Chart, BarController, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
  Chart.register(BarController, CategoryScale, LinearScale, Title, Tooltip, Legend);
  let barChart = ref(null);

onMounted(() => {
  barChart = new Chart('barChart', {
    type: 'bar',
    data: {
      labels: ['24.07', '24.08', '24.09', '24.10', '24.11'],
      datasets: [{
        label: '원금',
        data: [12, 19, 3, 5, 2],
        backgroundColor: '#031F84',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        stack: 'Stack 0', // Add this line
        
      },
      {
        label: '이자',
        data: [7, 8, 15, 2, 1],
        backgroundColor: '#367BF9',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        stack: 'Stack 0', // And this line
      },
      {
        label: '중도상환',
        data: [7, 8, 15, 2, 1],
        backgroundColor: '#FFAC08',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        stack: 'Stack 0', // And this line
        borderRadius: { topLeft: 8, topRight: 8 },
      }
    ]
    },
    options: {
  scales: {
    x: {
      // barThickness: 20,
      grid: {
        display: false
      },
    },
    y: {
      display: false,
      beginAtZero: true,
      grid: {
        display: false
      },
      ticks:{
        display: false
      }
    }
  },
  barPercentage: 0.6, // Adjust this value to change the bar width
  categoryPercentage: 0.7, // Adjust this value to change the space between bars
  plugins:{
    legend: {
      display: false,
      position: 'bottom',
      labels: {
        color: '#000000',
        boxWidth: 10,
        boxHeight: 10,
        padding: 20,
        usePointStyle: true,
        font: {
          size: 12,
          weight: 'bold'
        }
      }
    },
    afterDatasetsDraw: function(chart, options) {
      var ctx = chart.ctx;
      chart.data.datasets.forEach(function(dataset, i) {
        var meta = chart.getDatasetMeta(i);
        if (!meta.hidden) {
          meta.data.forEach(function(element, index) {
            // Draw the text in black, with the specified font
            ctx.fillStyle = 'rgb(0, 0, 0)';
            var fontSize = 16;
            var fontStyle = 'normal';
            var fontFamily = 'Helvetica Neue';
            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
            // Just naively convert to string for now
            var dataString = dataset.data[index].toString();
            // Make sure alignment settings are correct
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var padding = 5;
            ctx.fillText(dataString, element._model.x, element._model.y - (fontSize / 2) - padding);
          });
        }
      });
    }
  }
}
  });
});
</script>

<style scoped>
  .monthly{
    width: 100%;
    height: 100%;
    border-radius: 16px;
    border: 1px solid #DBDDE2;
    text-align: center;
    >div:nth-child(1){
      display: flex;
      justify-content: right;
      align-items: center;
      margin: 12px 12px 12px 0px;
    }
  }
  .total{
    display: flex;
    justify-content: space-around;
  }
  span{
    font-family: 'NanumSquareNeo_normal';
    font-size: 10px;
  }
</style>