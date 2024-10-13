<script setup lang="ts">
import type { System } from '@/api/types'
import type { PlusColumn, PlusDialogFormInstance } from 'plus-pro-components'
import type { FormItemProps } from './utils/type'
import * as permissionApi from '@/api/modules/system/permission'
import { affixOptions, fullOptions, hiddenTagOptions, keepAliveOptions, menuTypeOptions } from './utils/enums'
import { enabledOptions } from '/src/enums/enabledEnums'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Object as PropType<FormItemProps>,
    default: () => ({}),
  },
  dialogFormTitle: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'update:visible', 'success'])

const menuTree = ref<System.PermissionTree[]>([])

const defaultModel: FormItemProps = {
  menuType: 0,
  sort: 99,
  hidden: false,
  keepAlive: true,
  affix: false,
  fullScreen: false,
  status: 1,
}

const submitLoading = ref(false)
const dialogForm = ref<PlusDialogFormInstance>()
// 合并默认值
const dialogFormModel = ref<FormItemProps>({ ...defaultModel, ...props.modelValue })

const dialogFormColumns: PlusColumn[] = [
  {
    label: '菜单类型',
    prop: 'menuType',
    options: menuTypeOptions,
  },
  {
    label: '上级菜单',
    prop: 'parentId',
    valueType: 'cascader',
    fieldProps: {
      props: {
        value: 'id',
        label: 'title',
        emitPath: false,
        checkStrictly: true,

      },
    },
    options: computed(() => menuTree.value),
  },
  {
    label: '菜单名称',
    prop: 'title',
    colProps: {
      span: 12,
    },
  },
  {
    label: '路由名称',
    prop: 'routeName',
    colProps: {
      span: 12,
    },
    hideInForm: computed(() => dialogFormModel.value.menuType === 3),
  },
  {
    label: '路由路径',
    prop: 'routePath',
    colProps: {
      span: 12,
    },
    hideInForm: computed(() => dialogFormModel.value.menuType === 3),
  },
  {
    label: '组件路径',
    prop: 'component',
    colProps: {
      span: 12,
    },
    hideInForm: computed(() => dialogFormModel.value.menuType !== 0),
  },
  {
    label: '菜单排序',
    prop: 'sort',
    valueType: 'input-number',
    fieldProps: {
      min: 0,
      max: 999,
      controlsPosition: 'right',
    },
    colProps: {
      span: 12,
    },
  },
  {
    label: '路由重定向',
    prop: 'redirect',
    colProps: {
      span: 12,
    },
    hideInForm: computed(() => dialogFormModel.value.menuType !== 0),
  },
  {
    label: '菜单图标',
    prop: 'icon',
    colProps: {
      span: 12,
    },
    hideInForm: computed(() => dialogFormModel.value.menuType === 3),
  },
  {
    label: '是否隐藏',
    tooltip: '隐藏后在菜单栏不显示',
    prop: 'hidden',
    options: hiddenTagOptions,
    colProps: {
      span: 12,
    },
    hideInForm: computed(() => dialogFormModel.value.menuType === 3),
  },
  {
    label: '缓存页面',
    prop: 'keepAlive',
    tooltip: '保存该页面的整体状态，刷新后会清空状态',
    options: keepAliveOptions,
    colProps: {
      span: 12,
    },
    hideInForm: computed(() => [2, 3].includes(dialogFormModel.value.menuType as number)),
  },
  {
    label: '固定标签页',
    prop: 'affix',
    tooltip: '菜单名称固定显示在标签页且不可关闭',
    options: affixOptions,
    colProps: {
      span: 12,
    },
    hideInForm: computed(() => [2, 3].includes(dialogFormModel.value.menuType as number)),
  },
  {
    label: '全屏显示',
    prop: 'fullScreen',
    tooltip: '当前页面全屏显示(适合展示大量数据)',
    options: fullOptions,
    colProps: {
      span: 12,
    },
    hideInForm: computed(() => [2, 3].includes(dialogFormModel.value.menuType as number)),
  },
  {
    label: '权限标识',
    prop: 'perms',
    colProps: {
      span: 12,
    },
    hideInForm: computed(() => dialogFormModel.value.menuType !== 3),
  },
  {
    label: '状态',
    prop: 'status',
    colProps: {
      span: 12,
    },
    options: enabledOptions,
  },

]

const dialogFormRules = {
  title: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  routeName: [{ required: true, message: '请输入路由名称', trigger: 'blur' }],
  routePath: [{ required: true, message: '请输入路由路径', trigger: 'blur' }],
  perms: [{ required: true, message: '请输入权限标识', trigger: 'blur' }],

}

// 确认事件
function handleConfirm() {
  const id = dialogFormModel.value.id
  const isUpdate = !!id
  const promise = isUpdate ? _update() : _addNew()
  promise
    .then(() => {
      submitLoading.value = false
      emit('update:visible', false)
      emit('success')
      dialogForm.value?.formInstance?.resetFields()
    })
    .catch(() => {
      submitLoading.value = false
    })
}

async function _addNew() {
  submitLoading.value = true
  const target: System.ReqPermissionForm = Object.assign({}, dialogFormModel.value)
  return permissionApi.save(target)
}
async function _update() {
  submitLoading.value = true
  const target: System.ReqPermissionForm = Object.assign({}, dialogFormModel.value)
  return permissionApi.update(dialogFormModel.value!.id as string, target)
}

// 取消事件
function handleCancel() {
  dialogForm.value?.formInstance?.resetFields()
  emit('update:visible', false)
}

// 监听本地 model 的变化，并通过事件传递给父组件
watch(dialogFormModel, (newVal) => {
  emit('update:modelValue', newVal)
}, { deep: true })

// 监听visible的变化
watch(() => props.visible, (newVal) => {
  if (newVal) {
    dialogFormModel.value = { ...defaultModel, ...props.modelValue }
    onLoadTree()
  }
})

async function onLoadTree() {
  const { data } = await permissionApi.tree()
  menuTree.value = data
}
</script>

<template>
  <div class="main">
    <PlusDialogForm
      ref="dialogForm"
      v-model="dialogFormModel"
      :visible="visible"
      :dialog="{
        title: dialogFormTitle,
        width: '45%',
      }"
      :form="{
        rules: dialogFormRules,
        columns: dialogFormColumns,
        labelWidth: '100px',
        rowProps: {
          gutter: 30,
        },
        submitLoading: true,
      }"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #plus-field-menuType="{ prop, column }">
        <ElSegmented v-model="dialogFormModel[prop]" :options="column.options" />
      </template>
      <template #plus-field-hidden="{ prop, column }">
        <ElSegmented v-model="dialogFormModel[prop]" :options="column.options" />
      </template>
      <template #plus-field-keepAlive="{ prop, column }">
        <ElSegmented v-model="dialogFormModel[prop]" :options="column.options" />
      </template>
      <template #plus-field-affix="{ prop, column }">
        <ElSegmented v-model="dialogFormModel[prop]" :options="column.options" />
      </template>
      <template #plus-field-fullScreen="{ prop, column }">
        <ElSegmented v-model="dialogFormModel[prop]" :options="column.options" />
      </template>
      <template #plus-field-status="{ prop, column }">
        <ElSegmented v-model="dialogFormModel[prop]" :options="column.options" />
      </template>
      <template #plus-field-icon="{ prop }">
        <IconPicker v-model="dialogFormModel[prop]" />
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
            <ElButton type="primary" :loading="submitLoading">
              确定
            </ElButton>
          </template>
        </ElPopconfirm>
      </template>
    </PlusDialogForm>
  </div>
</template>
