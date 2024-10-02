<script setup lang="ts">
import { logoutApi } from '/src/api/modules/login'
import { LOGIN_URL } from '/src/config'
import router from '/src/router'
import { useUserStore } from '/src/store'

const userStore = useUserStore()

function logout() {
  ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    // 1.执行退出登录接口
    await logoutApi()

    // 2.清除 Token
    userStore.setToken('')

    // 3.重定向到登陆页
    router.replace(LOGIN_URL)
    ElMessage.success('退出登录成功！')
  })
}
</script>

<template>
  <ElDropdown trigger="click">
    <div class="avatar">
      <img src="https://avatars.githubusercontent.com/u/29754870?v=4" alt="avatar">
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem>
          <ReIcon icon="svg-icon:user" class="icon" />
          个人中心
        </ElDropdownItem>
        <ElDropdownItem>
          <ReIcon icon="svg-icon:edit" class="icon" />
          修改密码
        </ElDropdownItem>
        <ElDropdownItem divided @click="logout">
          <ReIcon icon="svg-icon:shutdown" class="icon" />
          退出登录
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
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
.icon {
  margin-right: 5px;
}
</style>
