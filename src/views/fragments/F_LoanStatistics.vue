<template>
  <div class="loan-statistics" :style="{ 'margin-top': isExpanded ? '220px' : '56px' }">
    <!-- <p>test: {{  msg }}</p> -->
    <p>스와이프 여부: {{ isExpanded }}</p>
    <p>전체 대출 잔액: {{ response.totalPrincipal }}</p>
    <p>총 상환원금: {{ response.totalPrincipalRepayment }}</p>
  </div>
</template>

<script setup>
  import { useStore } from '@/store/index.ts';
  import { ref, onMounted, computed, watch, defineProps} from "vue";
  import { getLoanStatistics } from '@/api/loan.js';

  const store = useStore();
  const response = ref('');
  onMounted(() => {
    store.setNavBarFlag('2_2');
    try{
      getLoanStatistics().then((res) => {
        response.value = res.response;
        console.log(res.response);
        // if (res.response.previousMonthPayment !== null) {
        //   response.value.previousMonthPayment = res.response.previousMonthPayment.toLocaleString();
        // }
        // if (res.response.loanCount !== null) {
        //   response.value.loanCount = res.response.loanCount;
        // }
        // response.value.loanSimpleDtoList = res.response.loanSimpleDtoList;
        // console.log(res.response);
      });
    }catch(error){
      console.log('에러발생', error);
    }
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