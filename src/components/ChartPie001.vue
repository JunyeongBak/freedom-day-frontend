<template>
    <div class="principal_ratio">
      <canvas id="piChart" width="380" height="300"></canvas>
    </div>
  </template>
  
  <script setup lang="ts">
    import { Chart, DoughnutController } from 'chart.js';
    import { ref, onMounted } from 'vue';
  
  
  
    const chartRef = ref<Chart | null>(null);
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    };
  
    // const updateChart = () => {
    //   if (!chartRef.value) return;
  
    //   chartRef.value.data = data;
    //   chartRef.value.update();
    // };
  
    onMounted(async () => {
      const labels = [];
  
      const data = {
        labels: labels,
        datasets: [
          {
            label: [],
            data: [10, 20, 30, 40, 50, 60, 70],
            backgroundColor: [
            '#3182F6', '#9F33C4', '#FFCE58', '#89D8D8', '#6B7583','#6B7583','#6B7583','#6B7583','#6B7583','#6B7583'
            ],
          },
        ],
      };
      try{
        const response = await fetch('https://www.freedom-day.site/api/test/loan-statistics');
        const fetchedData = await response.json();
        const temp = fetchedData['remainingPrincipalList'];
        data['labels'] = temp.map((item: { name: any; }) => item.name + " " + item.percentage + "%");
        data['datasets'][0]['data'] = temp.map((item: { amount: any; }) => item.amount);
  
      }catch(e){
        console.error('[veuchart] Error fetching data:', e);
      }
      const ctx = document.getElementById('piChart') as HTMLCanvasElement;
      const chart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options,
      });
  
      chartRef.value = chart;
    });
  </script>
  <style scoped>
  .principal_ratio{
    width: 100%;
    height: 100%;
    border-radius: 16px;
    border: 1px solid #DBDDE2;
  }
  </style>
  
  
  