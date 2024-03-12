<template>
  <div
    class="card-container"
    id="card-container">
    <div class="header-container">
      <div class="icon-container">
        <!-- 여기에 뒤로 가기 아이콘이나 이미지를 삽입할 수 있습니다. -->
      </div>
      <span>대출 상세페이지</span>
      <!-- 여러분의 HTML 구조에 맞춰 추가 컨텐츠를 여기에 삽입하세요. -->
    </div>
  </div>
</template>
  
<script setup>
</script>
  
<style lang="scss" scoped>
  /* box_origin */
  $main-bg-color: #FFFFFF;
  $border-color: #E4E4E4;
  $box-shadow-color: rgba(0, 0, 0, 0.1);
  $chip-bg-color: #565D69;
  $text-color: #FFFFFF;
  $grey-40-border: #BDC0C6;
  $grey-20-bg: #DBDDE2;
  $grey-10-bg: #F3F3F3;
  $gradient-blue: linear-gradient(270deg, #2B66F5 0%, #4BA6FE 100%);

  .header-container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    // align-items: flex-start;
    padding: 16px;
    // gap: 16px;
    // position: absolute;
    width: 328px;
    height: 190px;
    // left: calc(50% - 328px/2);
    // top: 32px;
    background: $main-bg-color;
    border: 1px solid $border-color;
    box-shadow: 0px 3px 10px $box-shadow-color;
    border-radius: 16px;
    margin: 20px 20px;


    
    .icon-container, .frame, .wrapped_chips, .chip_gray, .textbtn_detail, .btn_text, .vector, .contains_mixed, .ic_bank, .contains_text, .warpped_texts, .warpped_text_date, .line, .title, .contains_mix, .ic_haebang_24 {
      display: flex;
      align-items: center;
      gap: 8px; // 예시로 gap을 설정함, 실제 적용 시에는 각각의 요소에 맞게 조정 필요
  
      &.chip_gray, &.ic_bank {
        background: $chip-bg-color;
        border-radius: 999px;
      }
  
      &.line {
        border: 1px solid $grey-10-bg;
      }
    }
    
    .text, .btn_text {
      color: $text-color;
    }
    
    .vector {
      border: 1px solid $grey-40-border;
    }
    
    .ic_bank {
      background: $grey-20-bg;
    }
    
    .ellipse, .union, .rectangle {
      background: $grey-10-bg;
    }
    
    .union {
      background: $gradient-blue;
    }
  }
</style>