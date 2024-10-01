<script setup lang="ts">

</script>

<template>
  <ElDropdown trigger="click">
    <div class="avatar">
      <img src="https://avatars.githubusercontent.com/u/29754870?v=4" alt="avatar">
    </div>
  </ElDropdown>
</template>

<style scoped lang="scss">
.avatar {
  width: 40px;
  height: 40px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
