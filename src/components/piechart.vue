<template>
  <canvas ref="pieChart" width="320" height="320"></canvas>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  const pieChart = ref<HTMLCanvasElement | null>(null);

  const drawChart = () => {
    const canvas = pieChart.value;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const data = [30, 20, 15, 10, 25]; // Example data for the pie chart
    const colors = ['#9F33C4', '#FFCE58', '#89D8D8', '#6B7583', '#3182F6']; // Example colors for the pie chart
    const total = data.reduce((a, b) => a + b, 0);
    let startAngle = 0;

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
  };

  onMounted(() => {
    drawChart();
  });
</script>
