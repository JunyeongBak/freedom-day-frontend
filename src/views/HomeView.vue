<template>
  <div class="home">
    <div class="home__container">
      <div class="home-total-loan__container">
        <p><span class="home-total-loan-name__span">홍길동</span> 님의 총 대출 현황</p>
        <br />
        <p><span class="home-total-loan__span">전체 대출금</span></p>
        <p><span class="home-total-loan-amount__span">58,000,000원</span></p>
      </div>
      <div class="home-money__container">
        <img
          class="home-money__img"
          src="../assets/money.png"
          alt="home-money" />
      </div> 
    </div>
    <div class="home-separator1__line"></div>
    <div class="home-details__container">
      <div class="detail1__container">
        <div>오늘까지 상환 금액</div>
        <div>28,000,000원</div>
      </div>
      <div class="detail-separator1__line"></div>
      <div class="detail2__container">
        <div>상환률</div>
        <div>48%</div>
      </div>
    </div>
    <div
      class="chart"
      id="chart">
    </div>
    <!-- <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div> -->
  </div>
</template>

<script setup>
// import HelloWorld from "@/components/HelloWorld.vue";
</script>
