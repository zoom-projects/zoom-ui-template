<script setup lang="ts">
import ResetPassword from './resetPassword.vue'
import Roles from './roles.vue'
import { useUser } from './utils/hook'

const {
  plusPageRef,
  tableColumns,
  tableActionButtions,
  rolesVisible,
  submitLoading,
  formVisible,
  formRules,
  formModel,
  resetPasswordVisible,
  addNew,
  formSave,
  onLoad,
} = useUser()
</script>

<template>
  <div class="main">
    <PlusPage
      ref="plusPageRef"
      :columns="tableColumns"
      :request="onLoad"
      :table="{
        actionBar: {
          buttons: tableActionButtions,
        },
      }"
    >
      <template #table-title>
        <el-button type="primary" @click="addNew">
          <template #icon>
            <ReIcon icon="i-ep:plus" class="el-icon" />
          </template>
          添加用户
        </el-button>
      </template>
    </PlusPage>

    <PlusDialogForm
      v-model="formModel"
      v-model:visible="formVisible"
      :form="{
        columns: tableColumns,
        rowProps: {
          gutter: 20,
        },
        colProps: {
          span: 12,
        },
        labelWidth: '100px',
        rules: formRules,
      }"
      :dialog="{
        title: formModel.id ? '编辑用户' : '添加用户',
        width: '45%',
      }"
      @confirm="formSave"
    >
      <template #plus-field-status="{ prop, column }">
        <ElSegmented v-model="formModel[prop]" :options="column.options.value" />
      </template>
      <template #plus-field-gender="{ prop, column }">
        <ElSegmented v-model="formModel[prop]" :options="column.options.value" />
      </template>
      <template #dialog-footer="{ handleConfirm, handleCancel }">
        <ElButton
          @click="handleCancel"
        >
          取消
        </ElButton>
        <ElPopconfirm
          title="确认提交吗？"
          @confirm="handleConfirm"
        >
          <template #reference>
            <ElButton
              type="primary"
              :loading="submitLoading"
            >
              确定
            </ElButton>
          </template>
        </ElPopconfirm>
      </template>
    </PlusDialogForm>

    <ResetPassword
      v-model:visible="resetPasswordVisible"
      :user-info="formModel"
    />

    <Roles v-model:visible="rolesVisible" :user-id="formModel.id" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.plus-table-action-bar__dropdown__link) {
  color: var(--el-color-primary);
}
</style>
