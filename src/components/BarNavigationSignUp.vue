<template>
    <div class="nav-bar">
      <van-icon name="arrow-left"/>
      <span>회원가입</span>
    </div>
  </template>
  
  <script lang="ts" setup>
  
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