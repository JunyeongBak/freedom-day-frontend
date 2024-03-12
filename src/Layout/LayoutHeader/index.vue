<template>
  <div
    class="header-container"
    id="header-container">
    <div
      v-if="showBtn"
      class="icon-container"
      @click="goLastPage">
      <van-icon name="arrow-left" />
    </div>
    <div>{{ title }}</div>
  </div>
</template>

<script lang='ts'>
import { useRouter } from "vue-router";
export default {
  props: {
    // 头部标题
    title: String,
    // 是否显示返回按钮
    showBtn: Boolean,
  },
  setup() {
    const router = useRouter();
    /**
     * 返回上一页
     */
    const goLastPage = () => {
      console.log(3232);
      
      router.go(-1);
    };
    return {
      goLastPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 16px;
  color: #1D2532;
  font-family: 'NanumSquare Neo';
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 24px;
  transition: background-color 1.1s;

  .icon-container {
    margin-left: 10px;
    height: 100%;
    width: 32px;
    display: flex;
    align-items: center;

    font-family: 'NanumSquare Neo';
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 24px;
    &:hover,
    &:focus,
    &:active {
      color: mix(#fff, #000, 80);
    }
  }
}
</style>