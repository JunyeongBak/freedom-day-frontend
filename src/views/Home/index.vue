<template>
  <div>
    <div 
      v-if="hasData" 
      class="hasdata">
      <div class="hasdata-navbar">
        <a href="#">대출</a>
        <a href="#" style="color:#BDC0C6">통계</a>
        <a href="#" style="color:#BDC0C6">설정</a>
        <button class="hasdata-navbar__settings">관리</button>
      </div>
      <div class="hasdata-container__background1">
        <div class="hasdata-container__total">
          <span>OOO 님의 지난달 총 납부액</span>
          <div class="hasdata-container__total__amount">
            <img src="/src/assets/progressicon.svg" alt="Progress Icon"/>
            <span>58,000,000원</span>
          </div>
        </div>
      </div>
      <div class="hasdata-container__background2">
        <div class="hasdata-container__details">
          <span>나의 대출 (N개)</span>
          <div>
            <div class="hasdata-container__details__handle">
              <img src="/src/assets/ic_handle.svg" alt="Progress Icon"/>
            </div>
            <div class="hasdata-container__details__contents">
              <div>
                <div>생활비</div>
                <div>D-16</div>
                <img src="/src/assets/close.svg" alt="close"/>
              </div>
              <div>
                <img src="/src/assets/ic_bank.svg" alt="img" />
                <div>
                  <div>토스뱅크 신용대출</div>
                  <div>2024.12.04.</div>
                  <div>19,886,317원</div>
                  <div>매달 15일</div>
                </div>
              </div>
              <div class="hasdata-container__details__contents__line"></div>
              <div class="hasdata-container__details__contents__charts">
                <div>
                  <div></div>
                  <div>정말 반이에요! 거의 다 왔어요!</div>
                </div>
                <div>
                  <img src="/src/assets/ic_loandetails.svg" alt="img" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="hasdata-container__details__handle">
              <img src="/src/assets/ic_handle.svg" alt="Progress Icon"/>
            </div>
            <div class="hasdata-container__details__contents">
              <div>
                <div>생활비</div>
                <div>D-16</div>
                <img src="/src/assets/close.svg" alt="close"/>
              </div>
              <div>
                <img src="/src/assets/ic_bank.svg" alt="img" />
                <div>
                  <div>토스뱅크 신용대출</div>
                  <div>2024.12.04.</div>
                  <div>19,886,317원</div>
                  <div>매달 15일</div>
                </div>
              </div>
              <div class="hasdata-container__details__contents__line"></div>
              <div class="hasdata-container__details__contents__charts">
                <div>
                  <div></div>
                  <div>정말 반이에요! 거의 다 왔어요!</div>
                </div>
                <div>
                  <img src="/src/assets/ic_loandetails.svg" alt="img" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div
      v-else
      class="empty">
      <div class="empty-navbar"><span>해방의 날</span></div>
      <div class="empty-container">
        <span>해방의 날은</span>
        <span>처음 오셨네요?!</span>
        <div>
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_1053_1649)">
            <circle cx="70" cy="67" r="60" fill="#F3F3F3"/>
            <path d="M80.6976 40.8516C85.0304 31.5745 93.1517 25.3325 105 27C98.1674 40.4289 101.2 57.1659 102.5 64.5025C108.266 97.0418 92.5165 112.003 60 112.003C37.5 112.003 25 98.1516 25 81.0655C25 63.9793 39.0947 50.1294 56.4815 50.1294C68.1506 50.1294 76.3647 50.1287 80.6976 40.8516Z" fill="url(#paint0_linear_1053_1649)"/>
            <circle cx="45" cy="72" r="5" fill="white"/>
            <circle cx="69.9999" cy="72" r="5" fill="white"/>
            <path d="M70.0001 84.5001C70.0001 87.2615 64.4036 92.0001 57.5001 92.0001C50.5965 92.0001 45.0001 87.2615 45.0001 84.5001" stroke="white" stroke-width="2.43243" stroke-linecap="round"/>
            </g>
            <defs>
              <filter id="filter0_d_1053_1649" x="0" y="0" width="140" height="140" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="3"/>
              <feGaussianBlur stdDeviation="5"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1053_1649"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1053_1649" result="shape"/>
              </filter>
              <linearGradient id="paint0_linear_1053_1649" x1="105" y1="69.367" x2="25" y2="69.367" gradientUnits="userSpaceOnUse">
              <stop stop-color="#2B66F5"/>
              <stop offset="1" stop-color="#4BA6FE"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span>해방이와 함께</span>
        <span>계획적인 빚테크 시작해 볼까요?</span>
      </div>
      <button class="call-to-action">
        <img src="/home/tory/side/DEMO/freedom-day-frontend/src/assets/call_to_action.svg" alt="Button Icon" />
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue';

  let dataLength = ref(0)

  // 데이터 배열에 내용이 있는지 확인하는 computed 속성을 생성합니다.
  const hasData = computed(() => dataLength.value > 0);

  // 컴포넌트가 마운트되었을 때 데이터를 불러오는 함수를 호출합니다.
  onMounted(async () => {
    try {
      const response = await fetch('https://www.freedom-day.site/api/test/graph1');
      // const response = await fetch('');
      const fetchedData = await response.json();
      dataLength.value = fetchedData['response'].length
      console.log(dataLength.value)
    } catch (error) {
      console.error('Error fetching data:', error);
      dataLength = ref(0)
    }
  });
</script>

<style lang="scss" scoped>
  .empty {
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 360px;
    min-height: 800px;
    align-items: center;
    background-color: #F3F3F3;
    
    &-navbar{
      display: flex;
      width: 100%;
      min-width: 360px;
      min-height: 56px;
      top:0px;
      align-items: center;
      padding-left: 18px;
      background-color: #FFF;
      font-family: 'NanumSquareNeo_extrabold';
      font-weight: 800;
      font-size: 20px;
    }
    
    &-container{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 24px;
      min-width: 329px;
      min-height: 374px;
      font-size: 20px;
      font-weight: 700;
      background-color: #FFF;
      border-radius: 16px;
      font-family: 'NanumSquareNeo_normal';
      font-weight: 700;
      font-size: 20px;

      div > svg{
        margin-top: 24px;
        margin-bottom: 24px;
      }
    }
    .call-to-action{
      position: absolute;
      right: 16px;
      bottom: 34px;
      min-width: 46px;
      min-height: 46px;
      background: transparent;
      border-color: transparent;
    }
  }
  .hasdata {
    display: flex;
    flex-direction: column;
    min-width: 360px;
    min-height: 800px;
    max-width: 480px;
    position:relative;
    align-items: center;
    background-color: #F3F3F3;;

    &-navbar{
      display: flex;
      align-items: center;
      width: 100%;
      min-width: 360px;
      min-height: 56px;
      font-family: 'NanumSquareNeo_extrabold';
      font-size: 20px;
      background-color: #FFF;
      a {
        margin-left: 16px;
      }
      
      &__settings{
        position: absolute;
        top: 12px;
        right: 15px;
      }
    }
    &-container__background1{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      min-width: 330px;
      background-color: #FFF;
    }

    &-container__total{
      display: flex;
      min-width: 328px;
      max-width: 480px;
      min-height: 128px;
      border-radius: 16px;
      flex-direction: column;
      font-size: 18px;
      font-family: 'NanumSquareNeo_extrabold';
      background-color: #FFF;
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
      margin-top: 24px;
      margin-bottom: 24px;
      margin-left: 16px;
      margin-right: 16px;
      padding: 16px;
      
      &__amount{
        display: flex;
        justify-content: left;
        align-items: center;
        margin-top: 8px;
      }
      img {
        width: 84px;
        height: 84px;
      }

      div > span{
        margin-left: 16px;
        font-size: 24px;
        font-family: 'NanumSquareNeo_heavy';
      }
    }

    &-container__background2{
      width: 100%;
      min-width: 330px;
      background-color: #FFF;
      margin-top: 16px;
    }

    &-container__details{
      margin-top: 16px;
      background-color: #FFF;
      > :nth-child(1){
        margin-left: 16px;
        font-size: 18px;
        font-family: 'NanumSquareNeo_extrabold';
      }
      > div{
        position: relative;
        display: flex;
        justify-content: left;
        align-items: center;
        min-width: 328px;
        min-height: 234px;
        margin: 16px;
        border: 1px solid #DBDDE2;
        border-radius: 16px;
        background-color: #FFF;
      }

      &__contents{
        min-width: 274px;
        background-color: #FFFFFF;//여기
        > div:nth-child(1){
          display: flex;
          > img{
            position: absolute;
            right: 16px;
            top: 12px;
          }
          > div {
            display:flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-family: 'NanumSquareNeo_bold';
            min-width: 47px;
            min-height: 19px;
            border-radius: 999px;
            margin-right: 4px;
            color: #FFFFFF;
            &:nth-child(1){
              position: absolute;
              top: 16px;
              left: 38px;
              background: #565D69;
            }
            &:nth-child(2){
              position: absolute;
              top: 16px;
              left: 89px;
              background: #2B66F5;
            }
          }
        }
        &__line{
          border: 1px solid #F3F3F3;
          margin-top: 22px;
        }
        > div:nth-child(2){
          display:flex;
          > img{
            margin-right: 16px;
          }
          > div{
            display:grid;
            grid-template-columns: 1fr 1fr;

            > :nth-child(1){
              font-size: 12px;
              font-family: 'NanumSquareNeo_bold';
            }
            > :nth-child(2){
              text-align: right;
              color:#898F9A;
              font-size: 12px;
              font-family: 'NanumSquareNeo_bold';
              margin-right: 16px;
            }
            > :nth-child(3){
              min-width: 135px;
              font-size: 20px;
              font-family: 'NanumSquareNeo_extrabold';
            }
            > :nth-child(4){
              text-align: right;
              color:#898F9A;
              font-size: 12px;
              font-family: 'NanumSquareNeo_bold';
              margin-right: 16px;
            }
          }
        }
        &__charts{

          font-size: 12px;
          font-family: 'NanumSquareNeo_bold';
          margin-top: 8px;

          > div:first-child{
            display:flex;
            align-items: center;
            
            > div:first-child{
              width: 24px;
              height: 24px;
              background-color: #D9D9D9;
            }
            > div:nth-child(2){
              margin-left: 8px;
            }
          }
          > div:nth-child(2){
            position: absolute;
            bottom: 16px;
          }  
        }
      }

    }
  }
</style>
