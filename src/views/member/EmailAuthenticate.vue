<template>
  <div>
    <p>이메일 인증</p>
    <p>{{ $route.query.email }}</p>
    <p>{{ $route.query.domain }}</p>
    <button @click="handleAuthenticateEmail" class="blue_button">인증하기</button>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { postAuthenticateEmail } from '@/api/member.js';
  import { useRoute } from 'vue-router';
  const router = useRoute();
  const email = ref('');
  const domain = ref('');

  onMounted(() => {
    console.log(router.query.email);
    console.log(router.query.domain);
  });

  async function handleAuthenticateEmail() {
    try {
      email.value = router.query.email;
      domain.value = router.query.domain;
      const response = await postAuthenticateEmail(email.value + '@' + domain.value);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
</script>

<style lang="scss" scoped>
</style>