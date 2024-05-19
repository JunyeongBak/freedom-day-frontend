<template>
  <div class="loan-details">
    <div class="loan-details-navbar">
      <nav_bar :repaymentAmount="repaymentAmount"/>
    </div>
    <!-- {{ $route.query.id }}
    {{ $route.query.name }}
    {{ $route.query.purpose }}
    {{ $route.query.expirationDate }}
    {{ $route.query.outstandingPrincipal }}
    {{ $route.query.paymentDDay }}
    {{ $route.query.paymentPercentage }} -->
    <div class="loan-details-body">
      <f_loanDetails :loanDetails="loanDetails"/>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useStore } from '@/store';
  import { useRouter } from 'vue-router'
  import nav_bar from "@/layout/NavBar.vue";
  import f_loanDetails from '@/views/fragments/F_LoanDetails.vue';
  import { getLoanDetails } from '@/api/loan.js';

  const router = useRouter();

  const loanDetails = ref({
    name: '',
    purpose: '',
    bankCode: '',
    outstandingPrincipal: 0,
    repaymentAmount: 0,
    repaymentHistoryMonthList: [],
    totalPrincipal: 0,
    originationDate: '',
    loanPeriod: 0,
    interestRate: 0,
    repaymentMethod: '',
  });  

  const repaymentAmount = ref(0);

  onMounted(async () => { // async 키워드 추가
    // console.log(`id: ${router.currentRoute.value.query.id}`);
    const id = Number.parseInt(router.currentRoute.value.query.id);
    try {
      const response = await getLoanDetails(id); // await 키워드 추가
      // console.log('✨', response.response.repaymentAmount);
      loanDetails.repaymentAmount = Number.parseInt(response.response.repaymentAmount);
      // console.log('✨', loanDetails.repaymentAmount);
      repaymentAmount.value = loanDetails.repaymentAmount;
      loanDetails.value = response.response;
    } catch (error) {
      console.error(error);
    }
  });

  // onMounted(async () => {

  //   // console.log(`id: ${router.currentRoute.value.query.id}`);
  //   // const response = getLoanDetails(Number.parseInt(router.currentRoute.value.query.id)).then((res)=>{
  //     return res.response;
  //   }); 
    // const tmp = response;
    // console.log('✨', response);
    // repaymentAmount.value = response.repaymentAmount;
    // repaymentAmount.value = router.currentRoute.value.query.repaymentAmount;
</script>
  
<style lang="scss">

  .loan-details {
    width: 100vw;
    min-height: 100vh;
    height: auto;
    margin-top: 56px;
    background-color: #FFF;
    &-navbar{
      background-color: orange;
    }
  }

</style>
