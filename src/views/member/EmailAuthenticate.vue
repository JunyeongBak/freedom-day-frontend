<template>
  <div>
    <p>{{ $route.query.email + '@' + $route.query.domain}}</p>
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
      const response = await postAuthenticateEmail(email.value.trim() + '@' + domain.value.trim());
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
</script>

<style lang="scss" scoped>
  p {
    font-size: 20px;
    margin: 20px 0;
    font-family: 'NanumSquareNeo_bold';
  }
</style>