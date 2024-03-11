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
      id="chart"></div>
  </div>
</template>
  
  <script setup>
  </script>
  
  <style scoped>
    .home{
      margin-top: 60px;
      box-sizing: border-box;
      width: 330px;
      height: 235px;
      background-color: #fff;
      border-radius: 16px;
      padding: 20px;
      border: 1px solid #F3F3F3;
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
      &__container{
        display: flex;
        .home-total-loan__container{
          > :nth-child(1){
            font-size: 18px;
            .home-total-loan-name__span{
              color: #2B66F5;
            }
          }  
          > :nth-child(3){
            font-size: 16px;
          }  
          > :nth-child(4){
            font-size: 20px;
          }  
        }
        .home-money__img{
          margin-top: 26px;
          margin-left: 16px;
          max-width: 100%;
          height: 93px;
        }
      }
      .home-separator1__line{
        height: 0px;
        width: 295px;
        border: 1px solid #F3F3F3;
      }
      .home-details__container{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin-top:8px;
  
        .detail-separator1__line{
          height: 68px;
          width: 0px;
          border: 1px solid #F3F3F3;
        }
  
        .detail1__container{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-weight: 700;
          font-size: 16px;
          div:nth-child(2){
            font-weight: 900;
            font-size: 18px;
            text-align: center;
            color: #fff;
            width: 118%;
            max-width: 200px;
            /* min-width: 160px; */
            background: linear-gradient(270deg, #2B66F5 0%, #4BA6FE 100%);
            border-radius: 16px;
          }
        }
        .detail2__container{
          display:flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-weight: 700;
          font-size: 16px;
          text-align: center;
          div:nth-child(2){
            font-weight: 900;
            font-size: 18px;
            text-align: center;
            color: #fff;
            width: 118%;
            max-width: 100px;
            /* min-width: 60px; */
            background: linear-gradient(270deg, #FFA800 0%, #FFE074 100%);
            border-radius: 16px;
          }
        }
  
        .chart {
              width: 400px;
              height: 300px;
              margin: 20px;
              border: 1px solid #ccc;
          }
  
          .bar {
              transition: height 0.5s;
          }
      }
    }
  </style>