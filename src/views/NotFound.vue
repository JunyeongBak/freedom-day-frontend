<template>
  <div>
    <p>Not Found Error</p>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  onMounted(()=>{
    router.push('/');
  })
</script>

<style scoped>
</style>