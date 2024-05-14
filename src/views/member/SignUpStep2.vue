<template>
  <div class="sign-up-step2">
    <div class="sign-up-step2__navbar">
      <nav_bar />
    </div>
    <div class="sign-up-step2-body">

    </div>
  </div>
</template>

<script setup>
    import nav_bar from "@/layout/NavBar.vue";
    import { ref, computed, watch } from 'vue';
</script>

<style lang="scss" scoped>
  @import "@/style/common.scss";
  .sign-up-step2{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    &__navbar{
      top:0;
      width: 100%;
    }
    &-body{
      width: 100%;
      height: 100%;
      margin-top: 56px;
      background-color: $grey00;
    }
  }
</style>