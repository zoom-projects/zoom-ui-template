<script setup lang="ts">
import { useMessage } from './utils/hook'

const { plusPageRef, tableColumns, buttionActions, loadData } = useMessage()
</script>

<template>
  <div class="main">
    <PlusPage
      ref="plusPageRef"
      :columns="tableColumns"
      :request="loadData"
      :table="{
        actionBar: {
          buttons: buttionActions,
        },
        showOverflowTooltip: true,
      }"
    />
  </div>
</template>
