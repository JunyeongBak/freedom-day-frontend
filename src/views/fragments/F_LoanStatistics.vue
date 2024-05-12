<template>
  <div class="loan-statistics" >
    <div class="loan-statistics-remind">
      <p class="loan-statistics-remind__currentDate">{{ currentDate }}</p>
      <p class="loan-statistics-remind__due">상환 예정</p>
      <ul>
        <li v-for="loan in loanList" :key="loan.id">
          <div class="loan-statistics-remind-card">
            <img class="loan-statistics-remind-card__bankimg" src="@/assets/ic_bank.png" alt="">
            <div class="loan-statistics-remind-card-info">
              <p class="loan-statistics-remind-card-info__purpose">{{ loan.purpose }}</p>
              <p class="loan-statistics-remind-card-info__dday">D-{{ loan.paymentDDay }}</p>
            </div>
            <p class="loan-statistics-remind-card__name">{{ loan.name }}</p>
            <p class="loan-statistics-remind-card__duedate">{{ loan.paymentDate }}</p>
          </div>
        </li>
      </ul>
      <div style="width: 328px; height: 0px; border: 1px solid #F3F3F3; margin: 24px auto 16px "></div>
      
      <div class="loan-statistics-finish">
        <div class="loan-statistics-finish__container">
          <p class="loan-statistics-finish__container__label">상환 완료</p>
          <p class="loan-statistics-finish__conainer__amount">500,000원</p>
        </div>
        <div class="loan-statistics-finish-card">
          <img class="loan-statistics-finish-card__bankimg" src="@/assets/ic_bank.png" alt="">
          <p class="loan-statistics-finish-card__purpose">주택자금</p>
          <p class="loan-statistics-finish-card__name">하나은행 전세자금 대출</p>
          <p class="loan-statistics-finish-card__amount">500,000원</p>        
        </div>
      </div>
    </div>
    <div style="background-color: #F7F8FA; width:100%; height:16px; margin:24px auto 32px; box-sizing: border-box;"></div>
    <!-- loan-statistics-barchart 클래스 내에서만 스크롤이 되어야하고 화면 전체는 가로축 스크롤이 되면 안된다. -->
    <div class="loan-statistics-barchart" >
      <p class="loan-statistics-barchart__label">월별 총 상환 그래프</p>
      <div class="loan-statistics-barchart__chart" style="overflow:auto;border: 1px solid #DBDDE2;border-radius: 16px; width:95%; height:230px; margin:0 auto;" ref="barchartRef">
        <div class="loan-statistics-barchart__chart-label">(단위:천원)</div>
        <!-- 아래 v-for -->
        <div class="loan-statistics-barchart__chart-container">
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">22.05</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">22.06</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">22.07</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">22.08</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">22.09</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">22.10</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">22.11</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">22.12</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">23.01</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">23.02</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">23.03</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">23.04</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">23.05</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">23.06</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">23.07</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">23.08</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">23.09</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">23.10</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">23.11</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">23.12</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">24.01</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">24.02</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">24.03</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">24.04</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">24.05</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">24.06</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">24.07</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">250</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">24.08</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">24.09</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">24.10</div>
          </div>
          <div>
            <div class="loan-statistics-barchart__chart-total">700</div>
            <div class="loan-statistics-barchart__chart-graph">
              <div class="loan-statistics-barchart__chart-graph__midterm"></div>
              <div class="loan-statistics-barchart__chart-graph__interest"></div>
              <div class="loan-statistics-barchart__chart-graph__principal"></div>
            </div>
            <div class="loan-statistics-barchart__chart-date">24.11</div>
          </div>
        </div>
      </div>
    </div>
    <div class="loan-statistics-piechart">
      <p class="loan-statistics-piechart__label">대출 원금 비중</p>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from '@/store/index.ts';
  import { ref, onMounted, computed, watch, defineProps, watchEffect} from "vue";
  import { getLoanStatistics } from '@/api/loan.js';

  const store = useStore();
  const response = ref('');
  const totalPrincipal = ref(0);
  const totalPrincipalRepayment = ref(0);
  const loanList = ref([]);
  const emit = defineEmits(['response']);
  const currentDate = ref('');
  const barchartRef = ref(null);

  watchEffect(() => {
    emit('response', {_totalPrincipal: totalPrincipal.value, _totalPrincipalRepayment: totalPrincipalRepayment.value}); //HomePage.vue에 전달
  });

  onMounted(() => {
    store.setNavBarFlag('2_2');
    try{
      getLoanStatistics().then((res) => {
        response.value = res.response;
        totalPrincipal.value = res.response.totalPrincipal;
        totalPrincipalRepayment.value = res.response.totalPrincipalRepayment;
        loanList.value = res.response.loanList;
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // JavaScript의 getMonth()는 0부터 시작하므로 1을 더해줍니다.
        currentDate.value = `${year}년 ${month}월`;
        console.log('%c✨getLoanStatistics: ', 'color:#e34034;font-weight: bold;',res.response);
        barchartRef.value.scrollLeft = barchartRef.value.scrollWidth;
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
  @import "@/style/common.scss";
  .loan-statistics {
    width: 100%;
    height: 100vh;
    background-color: #FFF;
    padding-top: 16px;
    box-sizing: border-box;

    &-remind{
      &__currentDate{
        font-size: 16px;
        font-family: 'NanumSquareNeo_bold';
        margin-left: 16px;
      }
      &__due{
        font-size: 16px;
        font-family: 'NanumSquareNeo_bold';
        margin-top: 16px;
        margin-left: 16px;
        margin-bottom: 16px;
      }
      &-card{
        // background-color: orange;
        position: relative;
        width: 100vw;
        height: 48px;
        margin-bottom: 8px;
        &__bankimg{
          position: absolute;
          top: 0;
          left: 16px;
          width: 48px;
          height: 48px;
        }
        &-info{
          position: absolute;
          top: 3.5px;
          left: 72px;
          display: flex;

        }
        &-info__purpose{
          display: inline-block;
          text-align: center;
          line-height: 19px;
          min-width: 50px;
          height: 19px;
          background: #FFCE58;
          border-radius: 999px;
          margin-right: 4px;
          font-size:12px;
          font-family: 'NanumSquareNeo_bold';
          color: #FFF;
        }
        &-info__dday{
          display: inline-block;
          text-align: center;
          line-height: 19px;
          min-width: 50px;
          height: 19px;
          background: #2B66F5;
          border-radius: 999px;
          font-size:12px;
          font-family: 'NanumSquareNeo_bold';
          color: #FFF;
        }
        &__name{
          position: absolute;
          bottom: 3.5px;
          left: 72px;
          font-size:16px;
          font-family: 'NanumSquareNeo_bold';
        }
        &__duedate{
          position: absolute;
          bottom: 3.5px;
          right: 16px;
          font-size:14px;
          font-family: 'NanumSquareNeo_normal';
        }
      }
    }

    &-finish{
      &__container{
        display: flex;
        justify-content: space-between;
        margin : 0 16px 16px;
      }
      &__container__label{
        font-size: 16px;
        font-family: 'NanumSquareNeo_bold';
      }
      &__container__amount{
        font-size: 16px;
        font-family: 'NanumSquareNeo_bold';
      }
      &-card{
        position: relative;
        width: 100vw;
        height: 48px;
        margin: 16px 0;
      }
      &-card__bankimg{
        position: absolute;
        top: 0;
        left: 16px;
        width: 48px;
        height: 48px;
      }
      &-card__purpose{
        position: absolute;
        top: 3.5px;
        left: 72px;
        display: inline-block;
        text-align: center;
        line-height: 19px;
        min-width: 50px;
        height: 19px;
        background: #FFCE58;
        border-radius: 999px;
        margin-right: 4px;
        font-size:12px;
        font-family: 'NanumSquareNeo_bold';
        color: #FFF;
        box-sizing: border-box;
      }
      &-card__name{
        position: absolute;
        bottom: 3.5px;
        left: 72px;
        font-size:16px;
        font-family: 'NanumSquareNeo_bold';
        color:#898F9A;
      }
      &-card__amount{
        position: absolute;
        bottom: 3.5px;
        right: 16px;
        font-size:14px;
        font-family: 'NanumSquareNeo_normal';
        color: $gray-common;
      }
    }

    &-barchart{
      position: relative;
      // overflow: auto;
      // display: flex;
      // align-items: center;
      // justify-content: center;
      // &__chart{
      //   position: relative;
      // }
      &__label{
        font-size: 16px;
        font-family: 'NanumSquareNeo_bold';
        margin-left: 16px;
        margin-bottom: 16px;
      }
      &__chart-container{
        display: flex;
        align-items: center;
        margin-top: 36px;
        > div{
          margin-left: 38px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        > div:last-child{
          margin-right: 50px;
        }
        // justify-content:space-between;
      }
      &__chart-label{
        position: absolute;
        top: 48px;
        right: 12px;
        font-size: 12px;
        font-family: 'NanumSquareNeo_bold';
      }
      &__chart-graph{
        width: 20px;
        height: 100px;
        background: #D9D9D9;
        border-radius: 4px 4px 0px 0px;
        z-index: 100;
        &__principal{
          background: #031F84;
          height: 50px;
        }
        &__interest{
          background: #367BF9;
          height: 30px;
        }
        &__midterm{
          background: #FFAC08;
          height: 20px;
        }
      }
      &__chart-date{
        font-size: 12px;
        font-family: 'NanumSquareNeo_normal';
        margin-top: 8px;
        // margin-right: 22px;
      }
    }
    &-piechart{
      &__label{
        font-size: 16px;
        font-family: 'NanumSquareNeo_bold';
        margin-left: 16px;
        margin-bottom: 16px;
      }
    }
  }
</style>