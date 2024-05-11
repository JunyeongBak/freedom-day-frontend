<template>
  <div>
    <p>대출 통계탭</p>
  </div>
</template>

<script setup>
  import { useStore } from '@/store/index.ts';
  import { ref, onMounted, computed, watch} from "vue";
  
  const store = useStore();
  onMounted(() => {
    store.setNavBarFlag('2_2');
  });
</script>

<style lang="scss" scoped>
  div{
    position: absolute;
    top: 600px;
  }
</style>