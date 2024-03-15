<template>
  <div>
    <button @click="handleClick">백엔드 테스트 버튼</button>
  </div>
</template>

<script setup>
import { getGraph } from "../api/test.js";

// 더미 그래프 데이터 출력 로직
async function handleClick() {
  try {
    const response = await getGraph();
    const list = response.data.response;
    console.log(list);
  } catch {
    console.log("통신 실패");
  }
}
</script>

<style></style>
