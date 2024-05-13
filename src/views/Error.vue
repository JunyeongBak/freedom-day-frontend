<template>
  <div style="display:flex; justify-content: center; align-items: center;">
    <p style="font-size:56px; font-family: 'NanumSquareNeo_heavy';">Error</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';

const route = useRouter();

onMounted(() => {
  route.push('/');
})
</script>

<style scoped>
</style>