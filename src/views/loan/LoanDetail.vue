<template>
  <div class="loan-details">
    <div class="loan-details-navbar">
      <nav_bar />
    </div>
    <f_loanDetails />
  </div>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useStore } from '@/store';
  import { useRouter } from 'vue-router'
  import nav_bar from "@/layout/NavBar.vue";
  import f_loanDetails from '@/views/fragments/F_LoanDetails.vue';
</script>
  
<style lang="scss">

  .loan-details {
    width: 100vw;
    min-height: 100vh;
    height: auto;
    background-color: blue;
    &-navbar{
      background-color: orange;
    }
  }

</style>
