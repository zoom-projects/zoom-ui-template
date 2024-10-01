<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useTheme } from './hooks/useTheme'
import { useGlobalStore } from './store'
import { Locale } from './utils/enums'

const globalStore = useGlobalStore()

// init theme
const { initTheme } = useTheme()
initTheme()

// element language
const locale = computed(() => {
  const lang = globalStore.locale === Locale.zh ? zhCn : null
  if (lang) {
    return lang
  }
  return zhCn
})
const size = computed(() => globalStore.size)

// element button config
const buttonConfig = reactive({ autoInsertSpace: false })
</script>

<template>
  <ElConfigProvider :locale="locale" :size="size" :button="buttonConfig">
    <RouterView />
  </ElConfigProvider>
</template>

<style scoped>
</style>
