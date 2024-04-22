<template>
  <div class="nav-bar" @click="goBack">
    <van-icon name="arrow-left"/>
    <span>사용자 정보 입력</span>
  </div>
</template>

<script lang="ts" setup>
  import {useRouter} from 'vue-router';
  const router = useRouter();
  function goBack(){
    router.back();
  }
</script>

<style lang="scss" scoped>
  span{
    font-size: 20px;
    font-weight: 800;
  }
  div{
    display: flex;
    justify-content: left;
    width: 360px;
    height: 56px;
    background-color: #fff;
  }
  .nav-bar{
      align-items: center;
      >span{
        margin-left: 8px;
      }
  }
</style>