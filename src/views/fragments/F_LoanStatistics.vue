<template>
  <div class="loan-statistics" :style="{ 'margin-top': isExpanded ? '220px' : '56px' }">
    <p>test: {{  msg }}</p>
    <p>test2: {{ isExpanded }}</p>
  </div>
</template>

<script setup>
  import { useStore } from '@/store/index.ts';
  import { ref, onMounted, computed, watch, defineProps} from "vue";
  
  const store = useStore();
  onMounted(() => {
    store.setNavBarFlag('2_2');
  });

  const props = defineProps({
    msg: Number,
    isExpanded: Boolean
  });

</script>

<style lang="scss" scoped>
  .loan-statistics {
    // margin-top: 200px;
    width: 100%;
    height: 400px;
    background-color: orange;
  }
</style>