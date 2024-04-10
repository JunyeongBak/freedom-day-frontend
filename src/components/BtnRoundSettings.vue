<template>
  <button
        @click="currentTab = 'settings'"
        :class="vb_hasdataNavbarSettings"
      >
        관리
  </button>
</template>

<script setup>
</script>

<style lang="scss" scoped>
  button {
    width: 57px;
    height: 32px;
    font-family: 'NanumSquareNeo_normal';
    background: #FFFFFF;
    /* grey/10 */
    border: 1px solid #F3F3F3;
    border-radius: 999px;
    font-size: 14px;
    line-height: 24px;
    margin-right: 8px;
  }
</style>