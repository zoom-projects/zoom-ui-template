<script setup lang="ts">
import { useUserStore } from '@/store'
import { LoginType } from '@/utils/enums'
import { ElForm } from 'element-plus'
import Motion from '../utils/motion'
import { useVerifyCode } from '../utils/verifyCode'

const { isDisabled, text } = useVerifyCode()
const useStore = useUserStore()
type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()
const phoneRules = reactive({
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})
const loading = ref(false)
const ruleForm = reactive<any>({
  phone: '',
  code: '',
})

function formSubmit() {
}

function onBack() {
  useStore.loginType = LoginType.username
}
</script>

<template>
  <ElForm
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="phoneRules"
    size="large"
  >
    <Motion>
      <ElFormItem prop="phone">
        <ElInput
          v-model="ruleForm.phone"
          placeholder="手机号"
        >
          <template #prefix>
            <ReIcon icon="svg-icon:iphone" class="el-icon" />
          </template>
        </ElInput>
      </ElFormItem>
    </Motion>
    <Motion :delay="100">
      <ElFormItem prop="code">
        <div class="flex justify-between">
          <ElInput
            v-model="ruleForm.code"
            placeholder="验证码"
            clearable
          >
            <template #prefix>
              <ReIcon icon="svg-icon:security-shield-fill" class="el-icon" />
            </template>
          </ElInput>
          <ElButton
            class="ml-2"
            :disabled="isDisabled"
            @click="useVerifyCode().start(ruleFormRef, 'mobile', ruleForm.phone, 'mobile')"
          >
            {{ text.length > 0 ? `${text} 秒后重新获取` : '获取验证码' }}
          </ElButton>
        </div>
      </ElFormItem>
    </Motion>
    <Motion :delay="150">
      <ElFormItem>
        <ElButton
          class="w-full"
          size="default"
          type="primary"
          :loading="loading"
          @click="formSubmit"
        >
          登录
        </ElButton>
      </ElFormItem>
    </Motion>
    <Motion :delay="200">
      <ElFormItem>
        <ElButton
          class="w-full"
          size="default"
          @click="onBack"
        >
          返回
        </ElButton>
      </ElFormItem>
    </Motion>
  </ElForm>
</template>
