<template>
  <div>
    <div class="hasdata-container__details__handle">
      <img class="hasdata-container__details__handle-image" src="/src/assets/ic_handle.svg" alt="Progress Icon"/>
    </div>
    <div class="hasdata-container__details__contents">
      <div>
        <div>{{loandata.purpose}}</div>
        <div>D-{{ loandata.paymentDDay }}</div>
        <img src="/src/assets/close.svg" alt="close"/>
      </div>
      <div>
        <img src="/src/assets/ic_bank.svg" alt="img" />
        <div>
          <div>{{ loandata.name }}</div>
          <div>{{ proExData }}</div>
          <div>{{ proOutData }}원</div>
          <div>매달 {{ loandata.paymentDate }}일</div>
        </div>
      </div>
      <div class="hasdata-container__details__contents__line"></div>
      <div class="hasdata-container__details__contents__charts">
        <div>
          <div></div>
          <div>정말 반이에요! 거의 다 왔어요!</div>
        </div>
        <div>
          <div class="hasdata-container__details__contents__charts__value">
            <div class="hasdata-container__details__contents__charts__value__bar" :style="{ width: width }"></div>
          </div>
          <!-- <img src="/src/assets/ic_loandetails.svg" alt="img" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script setup>
  import { defineProps, computed, ref, onMounted  } from 'vue';
  const width = ref('0%');
  const props = defineProps({
    // loandata: {
    //   type: Object,
    //   required: true,
    //   default: () => ({ name: '토스뱅크 신용대출', purpose: '생활비', paymentDDay: 20, outstandingPrincipal: 120000, expirationDate: "2024-14-03T22:00:00", paymentDate: 16, paymentPercentage: 9 })
    // }
    loandata : {
      name: String,
      purpose: String,
      paymentDDay: Number,
      outstandingPrincipal : Number,
      expirationDate: String,
      paymentDate : Number,
      paymentPercentage : Number,
    },
  });

  onMounted(() => {
    try{
      console.log('******************')
      console.log(props.loandata.paymentPercentage);
      width.value = props.loandata.paymentPercentage + '%';
    }catch (error){
      console.error('에러발생', error);
    }
  });

  const proExData = computed(() => {
    try{
      if (typeof(props.loandata.expirationDate) === 'string' ){
        return props.loandata.expirationDate.split('T')[0];
      }
    } catch (error){
      console.error('에러발생:', error);
      return [];
    }
  });

  const proOutData = computed(() => {
    try{
      if (typeof(props.loandata.outstandingPrincipal) === 'number'){
        return props.loandata.outstandingPrincipal.toLocaleString();
      }
    }catch(error){
      console.error('에러발생:', error);
      return [];
    }
  });

  // const expirationDateList = computed(() => props.loandata.expirationDate);
  // console.log(expirationDateList.value);
</script>