<template>
  <div class="loan-details__fragment">
    <p>대출 상세</p>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useStore } from '@/store';
  import { useRouter } from 'vue-router'
  import nav_bar from "@/layout/NavBar.vue";

  const router = useRouter();
  const store = useStore();
</script>

<style lang="scss" scoped>
</style>