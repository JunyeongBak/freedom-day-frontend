<template>
  <div>test</div>
  <div>{{ store.formData.step1.email_beginning }}</div>
  <div>{{ store.formData.step1.email_back }}</div>
  <div>{{ store.formData.step1.password }}</div>
</template>

<script setup>
  import { useStore } from "@/store/index";
  import {useRouter} from "vue-router";
  const store = useStore();
  const router = useRouter();

  console.log(store.formData.step1.email_beginning)
  console.log(store.formData.step1.email_back)
  console.log(store.formData.step1.password)
</script>

<style scoped>

</style>