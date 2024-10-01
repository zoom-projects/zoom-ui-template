<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <div class="fullscreen">
    <ReIcon :icon="isFullscreen ? 'svg-icon:fullscreen-exit' : 'svg-icon:fullscreen'" class="toolBar-icon" @click="toggle" />
  </div>
</template>
