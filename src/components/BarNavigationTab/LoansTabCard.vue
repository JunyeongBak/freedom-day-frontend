<template>
  <div class="loan-card__component">
    <div class="loan-card-handle">
      <img class="" src="/src/assets/ic_handle.png" alt="Progress Icon"/>
    </div>
    <div class="loan-card-delete">
      <img src="/src/assets/ic_x.png" alt="close"/>
    </div>
    <div class="loan-card-info-container">
      <div :class="cssInfoPurpose" :style="{background:colorComputed}">
        <p>{{loandata.purpose}}</p>
      </div>
      <div :class="cssPaymentDday">
        <p>D-{{ loandata.paymentDDay }}</p>
      </div>
    </div>
    <div class="loan-card-contents">
      <img class="loan-card-contents__img" src="/src/assets/ic_bank.png" alt="img" />
      <div class="loan-card-contents__name">{{ loandata.name }}</div>
      <div class="loan-card-contents__exdata">{{ proExData }}</div>
      <div class="loan-card-contents__prooutdat_fontsize_16">{{ proOutData }}원</div>
      <div class="loan-card-contents__paymentday">매달 {{ loandata.paymentDate }}일</div>
      <div class="loan-card-contents__line"></div>
      <div class="loan-card-info2-container">
        <img class="loan-card-contents__what" src="@/assets/ic_loan.png" alt="img" />
        <div class="loan-card-contents__label"><p>{{ loanCheers }}</p></div>
      </div>
      <div class="loan-card-contents__chart">
        <div style="width: 36px; height:36px;">
          <img class="ic-loantab" src="@/assets/cha_50.svg" :style="{left: left}">
        </div>
        <p class="chart-percent" :style="{left: left}">{{ width }}</p>
        <div class="progress-bar" :style="{ width: width, minWidth: '15%' }"></div>
      </div>

    </div>
  </div>
</template>

<style>
</style>

<script setup>
  import { defineProps, computed, ref, onMounted, h  } from 'vue';
  const phrases = ref([
    "착실하게 해방의 날을 향하여~",
    "아시죠? 대출도 능력인거ㅎ",
    "오늘은 경제 뉴스를 보는거 어때요?",
    "얼른 해방되고 싶어요오~~",
    "으쌰!으쌰!",
    "매달 상환하는 당신! 대견해요!",
    "이번 달은 중도상환 어때요?"
  ]);
  const colors = {
    '생활비': '#9F33C4',
    '학자금': '#FFCE58',
    '자동차': '#89D8D8',
    '주택자금': '#3182F6',
    '기타': '#6B7583',
  };
  const colorComputed = computed(()=>{
    // console.log(props.loandata.purpose);
    if (props.loandata.purpose == '생활비'){
      return colors['생활비'];
    }else if(props.loandata.purpose == '학자금'){
      return colors['학자금'];
    }else if(props.loandata.purpose == '자동차'){
      return colors['자동차'];
    }else if(props.loandata.purpose == '주택자금'){
      return colors['주택자금'];
    }else if(props.loandata.purpose == '기타'){
      return colors['기타'];
    }
  });
  const width = ref('0%');
  const left = ref('10%');
  const cssInfoPurpose = ref('loan-card-info__purpose');
  const cssPaymentDday = ref('loan-card-info__paymentDDay');
  // loan-card-contents__prooutdat
  const cssProOutDat = ref('loan-card-contents__prooutdat');
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
    
    const loanCheers = computed(() => {
      const msg = '';
      if (Math.round(props.loandata.paymentPercentage) == 10 ){
        return '시작이 반! 벌써 반이네요?';
      }
      else if(Math.round(props.loandata.paymentPercentage) == 20){
        return '연체없는 대출 습관을 들여봐요ㅎㅎ';
      }
      else if(Math.round(props.loandata.paymentPercentage) == 30){
        return '해방의 날은 금방 올거에요!';
      }
      else if(Math.round(props.loandata.paymentPercentage) == 40){
        return '곧 있음 절반! 너무 잘하고 있잖아요?';
      }
      else if(Math.round(props.loandata.paymentPercentage) == 50){
        return '정말 반! 거의 다 왔어요!!';
      }
      else if(Math.round(props.loandata.paymentPercentage) == 60){
        return '와 벌써 이만큼이나!';
      }
      else if(Math.round(props.loandata.paymentPercentage) == 70){
        return '행운의 숫자 7! 좋은 일 생길거에요!';
      }
      else if(Math.round(props.loandata.paymentPercentage) == 80){
        return '빨리 해방돼서 맛있는거 사먹으러 가요!';
      }
      else if(Math.round(props.loandata.paymentPercentage) == 90){
        return '이제 정말 고지가 눈 앞ㅠㅠ';
      }
      else if(Math.round(props.loandata.paymentPercentage) == 100){
        return '드디어 해방!! 축하드려요!';
      }
  
      return getRandomPhrase();
    });
  onMounted(() => {
    try{
      // console.log(proOutData);
      width.value = props.loandata.paymentPercentage + '%';
      left.value = (props.loandata.paymentPercentage - 14);
      if (left.value < 0){
        left.value = 2 + '%';
      }else if (left.value > 100){
        left.value = 88 + '%';
      }else{
        left.value = left.value + '%';
      }
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

  // 2024-05-16 font-size 16px로 일괄 적용()
  const proOutData = computed(() => {
    try{
      if (typeof(props.loandata.outstandingPrincipal) === 'number'){
        if (props.loandata.outstandingPrincipal >= 100000000) {
          cssProOutDat.value = 'loan-card-contents__prooutdat_fontsize_16';
        }else if(props.loandata.outstandingPrincipal >= 10000000){
          cssProOutDat.value = 'loan-card-contents__prooutdat_fontsize_20';
        } 
        else {
          cssProOutDat.value = 'loan-card-contents__prooutdat';
        }
        return props.loandata.outstandingPrincipal.toLocaleString();
      }
    }catch(error){
      console.error('에러발생:', error);
      return [];
    }
  });

  function getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * phrases.value.length);
    return phrases.value[randomIndex];
  }

  // const expirationDateList = computed(() => props.loandata.expirationDate);
  // console.log(expirationDateList.value);
</script>

<style lang="scss" scoped>
  @import "@/style/common.scss";
  .loan-card{
    &__component{
      position: relative;
      margin-top: 8px;
      width: 328px;
      height: 234px;
      border: 1px solid #DBDDE2;
      border-radius: 16px;
    }
    &-handle{
      position: absolute;
      top: 50%;
      left: 0;
      opacity: 0;
    }
    &-delete{
      position: absolute;
      top: 16px;
      right: 16px;
      opacity: 0;
    }
    &-info{
      &__purpose{
        display: inline-block;
        text-align: center;
        min-width: 48px;
        margin-left: 27px;
        // background-color: #9F33C4;
        font-size: 12px;
        font-family: 'NanumSquareNeo_bold';
        color: #FFF;
        border-radius: 999px;
        padding:4px;
      }
      &__paymentDDay{
        display: inline-block;
        min-width: 48px;
        text-align: center;
        margin-left: 4px;
        background-color: $blue10;
        font-size: 12px;
        font-family: 'NanumSquareNeo_bold';
        color: #FFF;
        border-radius: 999px;
        padding:4px;
      }
    }
    &-contents{
      position: relative;
      top: 38px;
      left: 38px;
      width: 274px;
      height: 162px;
      // 은행 이미지
      &__img{
        position: absolute;
        top: 0;
        left: 0;
        width: 48px;
        height: 48px;
      }
      // name
      &__name{
        position: absolute;
        top: 0;
        left: 64px;
        font-size: 12px;
        font-family: 'NanumSquareNeo_bold';
        color: #1D2532;
      }
      // exdata
      &__exdata{
        position: absolute;
        top: 0;
        right: 0px;
        font-size: 12px;
        font-family: 'NanumSquareNeo_bold';
        color: #898F9A;
      }

      &__prooutdat{
        position: absolute;
        top: 22px;
        left: 64px;
        font-size: 24px;
        font-family: 'NanumSquareNeo_heavy';
        color: #101113;
      }
      &__prooutdat_fontsize_20{
        position: absolute;
        top: 25px;
        left: 64px;
        font-size: 20px;
        font-family: 'NanumSquareNeo_heavy';
        color: #101113;
      }
      &__prooutdat_fontsize_16{
        position: absolute;
        top: 25px;
        left: 64px;
        font-size: 16px;
        font-family: 'NanumSquareNeo_heavy';
        color: #101113;
      }
      &__paymentday{
        position: absolute;
        top: 28px;
        right: 0px;
        font-size: 12px;
        font-family: 'NanumSquareNeo_bold';
        color: #898F9A;
      }
      &__line{
        position: absolute;
        top: 70px;
        width: 272.15px;
        height: 0px;
        border: 1px solid #F3F3F3;
      }
      &__label{
        // top: 0px;
        // left: 28px;
        margin-left: 4px;
        font-size: 12px;
        font-family: 'NanumSquareNeo_bold';
        color: #1D2532;
      }
      &__what{
        width: 22px;
        height: 24px;
        // position: absolute;
        // top: 0;
        // top: 83px;
        // left: 0px;
      }
      &__chart{
        position: absolute;
        width: 100%;
        height: 16px;
        background: #DBDDE2;
        border-radius: 999px;
        bottom: 0;
        left: 0;
      }
    }
    .loan-card-info-container{
      position: relative;
      top: 23px;
    }
    .loan-card-info2-container{
      display: flex;
      align-items: center;
      position: relative;
      top: 80px;
    }
    .progress-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 16px;
      width: 1000px;
      background: linear-gradient(270deg, #2B66F5 0%, #4BA6FE 100%);
      border-radius: 999px;
    }
    .ic-loantab{
      position: absolute;
      bottom: 18px;
      width: 36px;
      height: 36px;
      left: 0px;
    }
    .chart-percent{
      color: #FFF;
      position: absolute;
      bottom: 0;
      left: 0px;
      z-index: 1;
    }
  }
</style>