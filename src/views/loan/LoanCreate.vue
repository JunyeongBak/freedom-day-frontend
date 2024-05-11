<template>
  <div class="loan-create-nav-bar">
    <nav_bar />

    <div class="loan-create">
      <label for="loan-create__name" class="input_label">대출 이름</label>
      <input id="loan-create__name" class="loan-create__name" type="text" placeholder="대출 이름을 입력하세요." />
      <label for="loan-create__type" class="input_label">목적</label>
      <select id="loan-create__type" class="loan-create__type">
        <option value="" disabled selected hidden>대출 목적을 선택해주세요.</option>
        <option value="personal">개인 대출</option>
        <option value="business">사업 대출</option>
        <option value="mortgage">주택 대출</option>
      </select>
      <label for="loan-create__institution" class="input_label">기관</label>
      <select id="loan-create__institution" class="loan-create__institution">
        <option value="" disabled selected hidden>대출 기관을 선택해주세요.</option>
        <option value="bank">은행</option>
        <option value="credit_union">신용조합</option>
        <option value="online_lender">온라인 대출사</option>
      </select>
      <label class="input_label">상환 방법</label>
      <div class="loan-create__repayment">
        <input type="radio" id="loan-create__repayment-equal-principal" name="repayment" value="equal-principal" class="loan-create__repayment-option" checked/>
        <label for="loan-create__repayment-equal-principal" class="loan-create__repayment-option">원리금균등</label>
        <input type="radio" id="loan-create__repayment-equal-installment" name="repayment" value="equal-installment" class="loan-create__repayment-option"  />
        <label for="loan-create__repayment-equal-installment" class="loan-create__repayment-option">원금균등</label>
        <input type="radio" id="loan-create__repayment-lump-sum" name="repayment" value="lump-sum" class="loan-create__repayment-option" />
        <label for="loan-create__repayment-lump-sum" class="loan-create__repayment-option">만기일시</label>
      </div>
      <label for="loan-create__principal" class="input_label">총 원금</label>
      <input id="loan-create__principal" class="loan-create__principal" type="text" placeholder="보유하고 계신 대출의 총 원금을 입력해주세요" />
      <label for="loan-create__repayment-amount" class="input_label">상환 완료 금액</label>
      <input id="loan-create__repayment-amount" class="loan-create__repayment-amount" type="text" placeholder="해당 대출 원금 중 상환이 이루어진 금액을 입력해주세요" />
      
      <label for="loan-create__interest-rate" class="input_label">연이자율</label>
      <div class="loan-create__interest-rate">
        <input id="loan-create__interest-rate" class="loan-create__interest-rate-input" type="text" placeholder="해당 대출 연 이자율을 입력해주세요" />
        <div class="loan-create__interest-rate-variable">
          <input type="checkbox" id="loan-create__interest-rate-variable" class="loan-create__interest-rate-variable-input" />
          <label for="loan-create__interest-rate-variable" class="input-label-check">변동금리</label>
        </div>
      </div>
      <label for="loan-create__duration" class="input_label">대출 기간</label>
      <input id="loan-create__duration" class="loan-create__duration" type="text" placeholder="대출 기간 자동 입력" disabled />

      <label for="loan-create__start-date" class="input_label">시작일</label>
      <input id="loan-create__start-date" class="loan-create__start-date" type="text" placeholder="해당 대출의 시작일을 입력해주세요" />

      <label for="loan-create__expiration-date" class="input_label">만료일</label>
      <input id="loan-create__expiration-date" class="loan-create__expiration-date" type="text" placeholder="해당 대출의 만료일을 입력해주세요" />

      <button class="loan-create__button blue_button" @click="handleClickSave">저장하기</button>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from "@/store/index";
  import { ref, onMounted, computed, watch} from "vue";
  import nav_bar from '@/layout/NavBar.vue';
  import { postLoanCreate } from '@/api/loan.js';
  const hard = ref('');

  async function handleClickSave(){
    hard.value = {
      "name" : "카카오 청년전월세",
      "purpose" : "주택자금",
      "bankCode" : "",
      "totalPrincipal" : 100000000,
      "repaymentAmount" : 0,
      "interestRate" : 4.5,
      "variableRate" : false,
      "loanPeriod" : 24,
      "originationDate" : "2024-01-01",
      "expirationDate" : "2025-12-31",
      "paymentDate" : 1,
      "periodUnit" : "M"
    }
    console.log(hard.value);
    const response = await postLoanCreate(hard.value);
    console.log(response);
  
  }

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
    margin-top: 56px;
    width: 100vw;
    height: 100vh;
    background-color: #FFF;
    box-sizing: border-box;
    padding: 0 16px; 

    &__name{
      width: 100%;
    }
    &__type{
      width: 100%;
    }
    &__institution{
      width: 100%;
    }
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

