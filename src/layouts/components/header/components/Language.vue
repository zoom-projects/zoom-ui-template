<script setup lang="ts">
import type { Locale } from '@/utils/enums'
import { useGlobalStore } from '@/store'

const i18n = useI18n()
const globalStore = useGlobalStore()
const language = computed(() => globalStore.locale)

const languageList = [
  { label: '简体中文', value: 'zh' },
  { label: 'English', value: 'en' },
]

function changeLanguage(lang: Locale) {
  i18n.locale.value = lang
  globalStore.setGlobalState('locale', lang)
}
</script>

<template>
  <el-dropdown trigger="click" @command="changeLanguage">
    <ReIcon icon="svg-icon:globalization" class="toolBar-icon" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in languageList"
          :key="item.value"
          :command="item.value"
          :disabled="language === item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
