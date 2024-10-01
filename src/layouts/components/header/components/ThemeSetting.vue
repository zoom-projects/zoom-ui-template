<script setup lang="ts">
import mittBus from '@/utils/mittBus'

function openDrawer() {
  mittBus.emit('openThemeDrawer')
}
</script>

<template>
  <div class="theme-setting">
    <ReIcon icon="svg-icon:theme-outline" class="toolBar-icon" @click="openDrawer" />
  </div>
</template>
