<template>
  <main>
    <component :is="currentComponent" />
  </main>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useStore } from '@/store/index';
  import loans_tab from "@/components/BarNavigationTab/LoansTab.vue";
  import static_tab from "@/components/BarNavigationTab/StaticTab.vue";
  import settings_tab from "@/components/BarNavigationTab/SettingsTab.vue";

  const store = useStore();
  const tabToComponentMap = [loans_tab, static_tab, settings_tab]; //탭 매핑
  const currentComponent = computed(() => tabToComponentMap[store.tabIndex]);
</script>

<style lang="scss" scoped>
</style>