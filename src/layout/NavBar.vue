<template>
  <div class="nav-bar">
    <div v-if="navBarFlag == '1_0'" class="nav-bar-1_0">
      <p>{{ title }}</p>
    </div>
    <div v-if="navBarFlag == '1_1'" class="nav-bar-1_1">
      <p>{{ title }}</p>
    </div>
    <div v-if="navBarFlag == '2'" class="nav-bar-2">
      <div class="nav-bar-router__loan">
        <router-link to="/home" >대출</router-link>
      </div>
      <div class="nav-bar-router__statistic">
        <router-link to="/static">통계</router-link>
      </div>
      <div class="nav-bar-router__settings">
        <router-link to="/settings">설정</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from "@/store/index";
  const router = useRouter();
  const store = useStore();
  const title = ref('해방의 날');
  const navBarFlag = ref(store.navBarFlag);
  console.log(typeof(navBarFlag.value));
</script>

<style lang="scss" scoped>
  .nav-bar{
    position: fixed;
    display: flex;
    align-items: center;
    width: 100vw;
    height: 56px;
    background-color: #fff;
    &-1_0{
      font-size: 20px;
      font-family: "NanumSquareNeo_extrabold";
      > p{
        margin-left: 18px;
      }
    }
  }
</style>