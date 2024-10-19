<script setup lang="ts">
import { useJob } from './utils/hook'

const {
  plusPageRef,
  plusDialogFormRef,
  formVisible,
  formModel,
  formRules,
  submitLoading,
  tableColumns,
  actionButtions,
  addNew,
  handleSave,
  loadData,
} = useJob()
</script>

<template>
  <div class="main">
    <PlusPage
      ref="plusPageRef"
      :columns="tableColumns"
      :request="loadData"
      :table="{
        actionBar: {
          buttons: actionButtions,
        },
      }"
    >
      <template #table-title>
        <el-button
          type="primary"
          @click="addNew"
        >
          <template #icon>
            <ReIcon icon="i-ep:plus" class="el-icon" />
          </template>
          新增
        </el-button>
      </template>
    </PlusPage>

    <PlusDialogForm
      ref="plusDialogFormRef"
      v-model:visible="formVisible"
      v-model="formModel"
      :form="{
        columns: tableColumns,
        labelWidth: '100px',
        rules: formRules,
      }"
      :dialog="{
        title: formModel.id ? '编辑任务' : '新增任务',
        width: '45%',
      }"
      @confirm="handleSave"
    >
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
            <ElButton type="primary" :loading="submitLoading">
              确定
            </ElButton>
          </template>
        </ElPopconfirm>
      </template>
    </PlusDialogForm>
  </div>
</template>
