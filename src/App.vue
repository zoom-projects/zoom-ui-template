<script setup lang="ts">
import { useTheme } from './hooks/useTheme'
import { useGlobalStore } from './store'

const globalStore = useGlobalStore()

// init theme
const { initTheme } = useTheme()
initTheme()

const size = computed(() => globalStore.size)

// element button config
const buttonConfig = reactive({ autoInsertSpace: false })
</script>

<template>
  <ElConfigProvider :size="size" :button="buttonConfig">
    <RouterView />
  </ElConfigProvider>
</template>

<style scoped>
</style>
