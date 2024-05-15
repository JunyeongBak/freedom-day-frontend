<template>
  <div class="loan-details-fragment">
    <div class="loan-details-fragment__card">
      테스트
    </div>
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
  .loan-details-fragment {
    &__card {
      width: 328px;
      height: 190px;
      margin: 300px auto;
      background-color: orange;
    }
  }
</style>