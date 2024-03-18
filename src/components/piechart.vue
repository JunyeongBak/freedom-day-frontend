<template>
  <div class="pichart">
    <canvas ref="pieChart" width="200" height="200"></canvas>
    <div class="legend" ref="legendRef"></div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, reactive } from 'vue';
  
  const arrPie = reactive({}) 
  const pieChart = ref<HTMLCanvasElement | null>(null);
  const legendRef = ref<HTMLElement | null>(null); 
  // const legendRef = document.getElementById('legend') as HTMLElement;
  const chartData = ref({
    labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
    datasets: [
      {
        backgroundColor: ['#3182F6', '#9F33C4', '#FFCE58', '#89D8D8', '#6B7583','#6B7583','#6B7583','#6B7583','#6B7583','#6B7583'],
        data: [],
      },
    ],
  });
  // const chartOptions = ref({
  //   responsive: true,
  //   maintainAspectRatio: true,
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //   },
  // });
  const drawChart = () => {
    const canvas = pieChart.value;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // https://www.freedom-day.site/api/test/loan-statistics
    const data = arrPie.data; // Example data for the pie chart
    const colors = chartData.value.datasets[0].backgroundColor; // Example colors for the pie chart
    const total = data.reduce((a, b) => a + b, 0);
    let startAngle = Math.PI / 2;

    for (let i = 0; i < data.length; i++) {
      const sliceAngle = (2 * Math.PI * data[i]) / total;
      ctx.beginPath();
      ctx.fillStyle = colors[i];
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();
      startAngle += sliceAngle;
    }
    createLegend();
  };
  const createLegend = () => {
    // const legend = legendRef.value;
    const labels = chartData.value.labels;
    const colors = chartData.value.datasets[0].backgroundColor;
    // console.log(legend)
    // console.log(labels)
    // console.log(colors)

    if (legendRef) {
      legendRef.innerHTML = ''; // Clear existing legend items
      labels.forEach((label, index) => {
        const legendItem = document.createElement('div');
        legendItem.classList.add('legend-item');
        legendItem.innerHTML = `
          <span class="legend-color" style="background-color: ${colors[index]};">${label}</span>
        `;
        legendRef.value.appendChild(legendItem);
      });
      console.log(legendRef.value.innerHTML)
    }
  };
  onMounted(async () => {
    try{
      const response = await fetch('https://www.freedom-day.site/api/test/loan-statistics');
      const fetchedData = await response.json();
      const data = fetchedData['remainingPrincipalList']; // Make sure this path matches your data structure
      chartData.value.labels = data.map((item: any) => item.name);
      // chartData.value.datasets[0].data = data.map((item: any) => item.amount);
      arrPie.data = data.map((item: any) => item.amount);

      drawChart();
      // console.log(arrPie.data)
    }catch(error){
      console.error('Error fetching data:', error);
    }
  });
</script>

<style lang="scss">
  .pichart{
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 360px;
    min-height: 240px;
  }
  .legend{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-family: 'NanumSquareNeo_bold';
    font-size: 16px;
    min-width: 360px;
    min-height: 20px;
    margin-top: 8px;
    // background-color: yellowgreen;
  }
</style>
