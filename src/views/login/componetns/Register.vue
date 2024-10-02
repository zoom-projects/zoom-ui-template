<script setup lang="ts">
import { ElForm } from 'element-plus'
import Motion from '../utils/motion'
import { useUserStore } from '/src/store'
import { LoginType } from '/src/utils/enums'

const userStore = useUserStore()
type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()

const updateRules = reactive({
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})

const ruleForm = reactive<any>({
  phone: '',
  code: '',
})

function onBack() {
  userStore.loginType = LoginType.username
}
</script>

<template>
  <ElForm
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="updateRules"
    size="large"
  >
    <Motion :delay="400">
      <ElFormItem>
        <ElButton class="w-full" size="default" @click="onBack">
          返回
        </ElButton>
      </ElFormItem>
    </Motion>
  </ElForm>
</template>
