<script setup lang="ts">

</script>

<template>
  <div class="message">
    <ElPopover placement="bottom" :width="310" trigger="click">
      <template #reference>
        <el-badge :value="5" class="item">
          <ReIcon icon="svg-icon:bell-outlined" class="toolBar-icon" />
        </el-badge>
      </template>
    </ElPopover>
  </div>
</template>

<style scoped lang="scss">
.message-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 260px;
  line-height: 45px;
}
.message-list {
  display: flex;
  flex-direction: column;
  .message-item {
    display: flex;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid var(--el-border-color-light);
    &:last-child {
      border: none;
    }
    .message-icon {
      width: 40px;
      height: 40px;
      margin: 0 20px 0 5px;
    }
    .message-content {
      display: flex;
      flex-direction: column;
      .message-title {
        margin-bottom: 5px;
      }
      .message-date {
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }
    }
  }
}
</style>
