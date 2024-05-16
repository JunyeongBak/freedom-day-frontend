<template>
  <div class="loan-create-nav-bar">
    <nav_bar />
  </div>
  <div class="loan-create">
    <label for="loan-create__name" class="input_label">대출 이름</label>
    <input 
      id="loan-create__name" 
      class="loan-create__name"
      v-model="name" 
      type="text" 
      placeholder="대출 이름을 입력하세요." 
      @blur="test"
      />
    <label for="loan-create__type" class="input_label">목적</label>
    <select id="loan-create__type" class="input_dropdown" @change="test" v-model="repayMethod">
      <option value="" disabled selected hidden>대출 목적을 선택해주세요.</option>
      <option value="주택자금">주택자금</option>
      <option value="생활비">생활비</option>
      <option value="자동차">자동차</option>
      <option value="학자금">학자금</option>
      <option value="기타">기타</option>
    </select>
    <label for="loan-create__institution" class="input_label">기관</label>
    <select id="loan-create__institution" class="input_dropdown" @change="test" v-model="bank">
      <option value="" disabled selected hidden>대출 기관을 선택해주세요.</option>
      <option value="SC제일은행">SC제일은행</option>
      <option value="국민은행">국민은행</option>
      <option value="농협은행">농협은행</option>
      <option value="대구은행">대구은행</option>
      <option value="부산은행">부산은행</option>
      <option value="산업은행">산업은행</option>
      <option value="수협은행">수협은행</option>
      <option value="신한은행">신한은행</option>
      <option value="우리은행">우리은행</option>
      <option value="중소기업은행">중소기업은행</option>
      <option value="하나은행">하나은행</option>
      <option value="한국수출입은행">한국수출입은행</option>
      <option value="한국씨티은행">한국씨티은행</option>
      <option value="우체국예금보험">우체국예금보험</option>
      <option value="새마을금고">새마을금고</option>
      <option value="신협협동조합">신협협동조합</option>
      <option value="농협협동조합">농협협동조합</option>
      <option value="수산협동조합">수산협동조합</option>
      <option value="산림조합">산림조합</option>
      <option value="상호저축은행">상호저축은행</option>
      <option value="카카오뱅크">카카오뱅크</option>
      <option value="토스뱅크">토스뱅크</option>
      <option value="기타">기타</option>
    </select>
    <label class="input_label">상환 방법</label>
    <div class="loan-create__repayment">
      <input
        type="radio"
        id="loan-create__repayment-equal-principal" 
        name="repayment" 
        value="EPI" 
        class="loan-create__repayment-option" 
        checked
        v-model="picked"
        @change="test"
        />
      <label for="loan-create__repayment-equal-principal" class="loan-create__repayment-option">원리금균등</label>
      <input
        type="radio" 
        id="loan-create__repayment-equal-installment"
        name="repayment" 
        value="EP" 
        class="loan-create__repayment-option" 
        v-model="picked"
        @change="test"
        />
      <label for="loan-create__repayment-equal-installment" class="loan-create__repayment-option">원금균등</label>
      <input
        type="radio" 
        id="loan-create__repayment-lump-sum" 
        name="repayment" 
        value="BR" 
        class="loan-create__repayment-option" 
        v-model="picked"
        @change="test"
        />
      <label for="loan-create__repayment-lump-sum" class="loan-create__repayment-option">만기일시</label>
    </div>
    <label for="loan-create__principal" class="input_label">총 원금</label>
    <input 
      id="loan-create__principal" 
      class="loan-create__principal" 
      type="text" 
      placeholder="보유하고 계신 대출의 총 원금을 입력해주세요" 
      v-model="totalPrincipal"
      @blur="test"
      />
    <label for="loan-create__repayment-amount" class="input_label">상환 완료 금액</label>
    <input 
      id="loan-create__repayment-amount" 
      class="loan-create__repayment-amount" 
      type="text" 
      placeholder="해당 대출 원금 중 상환이 이루어진 금액을 입력해주세요" 
      v-model="repaymentAmount"
      @blur="test"
      />
    
    <label for="loan-create__interest-rate" class="input_label">연이자율</label>
    <div class="loan-create__interest-rate">
      <input 
        id="loan-create__interest-rate" 
        class="loan-create__interest-rate-input" 
        type="text" 
        placeholder="해당 대출 연 이자율을 입력해주세요" 
        v-model="interestRate"
        @blur="test"
        />
      <div class="loan-create__interest-rate-variable">
        <input 
          type="checkbox"
          id="loan-create__interest-rate-variable"
          class="loan-create__interest-rate-variable-input" 
          />
        <label for="loan-create__interest-rate-variable" class="input-label-check">변동금리</label>
      </div>
    </div>
    <label for="loan-create__duration" class="input_label">대출 기간</label>
    <input 
      id="loan-create__duration" 
      class="loan-create__duration" 
      type="text" 
      placeholder="대출 기간 자동 입력" 
      v-model="month"
      disabled 
      />

    <label for="loan-create__start-date" class="input_label">시작일</label>
    <input 
      id="loan-create__start-date" 
      class="loan-create__start-date" 
      type="text" 
      placeholder="해당 대출의 시작일을 입력해주세요" 
      v-model="startDate"
      @blur="test"
      />

    <label for="loan-create__expiration-date" class="input_label">만료일</label>
    <input 
      id="loan-create__expiration-date" 
      class="loan-create__expiration-date" 
      type="text" 
      placeholder="해당 대출의 만료일을 입력해주세요" 
      v-model="expirationDate"
      @blur="test"
      />

    <button class="loan-create__button blue_button" @click="handleClickSave">저장하기</button>
  </div>
</template>

<script setup>
  import { useStore } from "@/store/index";
  import { ref, onMounted, computed, watch} from "vue";
  import nav_bar from '@/layout/NavBar.vue';
  import { postLoanCreate } from '@/api/loan.js';
  const hard = ref('');

  const name = ref(''); //대출이름
  const repayMethod = ref('') //상환방법
  const bank = ref('') //은행
  const picked = ref('') //상환방법 BR:만기일시 EPI:원리금균등 RP:원금균등
  const totalPrincipal = ref(null) //총 원금
  const repaymentAmount = ref(null) //상환 완료 금액
  const interestRate = ref('') //연이자율
  const month = ref('') //대출기간
  const startDate = ref('') //시작일
  const expirationDate = ref('') //만료일

  async function handleClickSave(){
    hard.value = {
      "name" : name.value,
      "purpose" : repayMethod.value,
      "bankCode" : bank.value,
      "totalPrincipal" : totalPrincipal.value,
      "repaymentAmount" : repaymentAmount.value,
      "interestRate" : interestRate.value,
      "variableRate" : false,
      "loanPeriod" : 24,
      "originationDate" : "2023-01-01",
      "expirationDate" : "2024-12-31",
      "paymentDate" : 1,
      "periodUnit" : "M",
      "repaymentMethod" : picked.value
    }
    // console.log(hard.value);
    const response = await postLoanCreate(hard.value);
    console.log(response);
  
  }
  function test (){
    console.log('대출이름', name.value);
    console.log('목적',repayMethod.value);
    console.log('기관',bank.value);
    console.log('상환방법',picked.value);
    console.log('총 원금',totalPrincipal.value);
    console.log('상환 완료 금액',repaymentAmount.value);
    console.log('연이자율',interestRate.value);
    console.log('대출기간',month.value);
    console.log('시작일',startDate.value);
    console.log('만료일',expirationDate.value);
  }

  // 2024년은 윤년 초일 산입 말일 불산입 365일
  // 2023년은 평년 초일 산입 말일 불산입 364일
  // 2023-01-01 14:00:00 에 대출하고 2024-12-31 09:59:59 대출 갚으면 729일
  /**
   * @param {string} startDate 2023-01-01 00:00:00
   * @param {string} endDate 2024-12-31 23:59:59
   * @returns {number} 730일
   * start 계산 시 현재 시간을 초로 환산하여 빼고, end 계산 시 현재 시간을 초로 환산하여 23:59:59까지 더한다.
   */
  function calculatePeriod(startDate, endDate) {
    // 날짜 객체 생성
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`;
    console.log(time);
    
    const start = new Date(startDate);
    const end = new Date(endDate);

    // 종료 날짜에서 시작 날짜를 뺀 후, 결과를 밀리초 단위로 얻음
    const diff = end.getTime() - start.getTime();

    // 밀리초를 일 단위로 변환
    const days = diff / (1000 * 60 * 60 * 24);

    // 결과 반환
    return Math.floor(days);
  }
  console.log(calculatePeriod('2023-01-01 23:59:59','2023-01-02 00:59:59'));
  console.log(new Date('2024-01-01 00:00:00').getTime());
  console.log(new Date('2024-01-01 23:59:59').getTime());
  console.log(new Date('2024-01-02 00:00:00').getTime());

</script>

<style lang="scss" scoped>
  .loan-create-nav-bar {
    width: 100vw;
    height: 56px;
  }

  .loan-create{
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: left;

    // margin-top: 56px;
    width: 100vw;
    height: 1200px;
    background-color: #FFF;
    box-sizing: border-box;
    padding: 0 16px; 

    &__name{
      width: 100%;
    }
    // &__type{
    //   width: 100%;
    // }
    // &__institution{
    //   width: 100%;
    // }
    &__principal{
      width: 100%;
    }
    &__repayment-amount{
      width: 100%;
    }
    &__duration{
      width: 100%;
    }
    &__start-date{
      width: 100%;
    }
    &__expiration-date{
      width: 100%;
    }
    &__repayment{
      font-size: 14px;
      font-family: 'NanumSquareNeo_bold';
      position: relative;
      background: #BDC0C6;
      border-radius: 8px;
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > label{
        display: block;
        text-align: center;
        width: 33.3%;
      }
      &-option{
        display: none;
      }
      &-option + label{
        display: inline-block;
        padding: 10px;
        margin: 5px;
        background: inherit;
        cursor: pointer;
      }
      &-option:checked + label{
        border-radius: 8px;
        box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
        background: #FFF;
      }
    }
    &__interest-rate{
      display: flex;
      justify-content: space-between;
      &-input{
        width: 224px;
      }
      &-variable{
        width: 96px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #DBDDE2;
        border-radius: 8px;
      }
      &-variable-input{
        display: block;
        width: 18px;
        height: 18px;
      }
    }
  }
  .input_label{
    margin-top: 16px;
  }
  .input-label-check{
    font-size: 14px;
    font-family: 'NanumSquareNeo_bold';
  }

</style>

