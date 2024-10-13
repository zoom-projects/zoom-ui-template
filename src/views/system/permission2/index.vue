<script setup lang="ts">
import type { ActionBarButtonsRow, PlusColumn, PlusPage } from 'plus-pro-components'
import type { FormItemProps } from './utils/type'
import * as permissionApi from '@/api/modules/system/permission'
import { useDictStore } from '@/store'
import { deepTree } from '@/utils'
import { ElTag, type TreeNode } from 'element-plus'
import Form from './form.vue'
import { dictKeys, menuHiddenDictKey, menuTypeDictKey } from './utils/const'
import { menuTypeOptions } from './utils/enums'

const { toOptions, getDict, loadDict } = useDictStore()
const plusPageRef = ref<InstanceType<typeof PlusPage>>()

const currentRow = ref<any>()
const currentInfo = ref<FormItemProps>({})
const dialogFormVisible = ref(false)

const tableColumns: PlusColumn[] = [
  {
    label: '菜单名称',
    prop: 'title',
    fixed: 'left',
  },
  {
    label: '菜单类型',
    prop: 'menuType',
    hideInSearch: true,
    render: (value) => {
      const item = getDict(menuTypeDictKey, value)
      return h(ElTag, { type: item.color }, () => item.label)
    },
  },
  {
    label: '路由路径',
    prop: 'routePath',
    hideInSearch: true,
  },
  {
    label: '组件路径',
    prop: 'component',
    hideInSearch: true,
  },
  {
    label: '权限标识',
    prop: 'perms',
    valueType: 'tag',
    hideInSearch: true,
  },
  {
    label: '排序',
    prop: 'sort',
    hideInSearch: true,
  },
  {
    label: '隐藏',
    prop: 'isHidden',
    hideInSearch: true,
    valueType: 'select',
    options: computed(() => toOptions(menuHiddenDictKey)),
    render: (value) => {
      const item = getDict(menuHiddenDictKey, value)
      return h(ElTag, { type: item.color }, () => item.label)
    },
  },
]

const tableActionButtions: ActionBarButtonsRow[] = [
  {
    text: '新增',
    code: 'add',
    show: row => row.menuType !== 3,
    props: {
      type: 'primary',
      underline: false,
    },
    onClick: ({ row }) => {
      handleAddNew(row.id)
      currentRow.value = row
    },
  },
  {
    text: '编辑',
    code: 'edit',
    props: {
      type: 'primary',
      underline: false,
    },
    onClick: ({ row }) => {
      handleEdit(row)
      currentRow.value = row
    },
  },
  {
    text: '删除',
    code: 'delete',
    props: {
      type: 'primary',
      underline: false,
    },
    confirm: {
      title: '删除提示',
      message: '确定删除该数据吗？',
    },
    onConfirm: ({ row }) => {
      handleDelete(row)
      currentRow.value = row
    },
  },
]
/**
 *  加载数据
 * @param query .
 */
async function loadData(query: Record<string, any>) {
  const { data, success } = await permissionApi.list(query)
  const _data = onData(data)
  return { data: _data, success, total: 0 }
}
/**
 * 新增
 */
function handleAddNew(id?: string) {
  currentInfo.value = {
    parentId: id,
  }
  dialogFormVisible.value = true
}
/**
 * 编辑
 */
function handleEdit(row: any) {
  currentInfo.value = { ...row }
  dialogFormVisible.value = true
}

/**
 *  删除
 * @param row
 */
async function handleDelete(row: any) {
  await permissionApi.del(row.id)
  formSuccess()
}

// 解决子集过多导致展开卡顿
function onData(list: any) {
  const data = deepTree(list)
  // 递归处理
  function deep(data: any) {
    data.forEach((item: any) => {
      const nodes = plusPageRef.value?.plusTableInstance?.tableInstance?.store?.states?.lazyTreeNodeMap.value || {}
      if (nodes[item.id!]) {
        nodes[item.id!] = item.children!
      }

      if (item.children && item.children.length > 0) {
        item.hasChildren = true
        item._children = item.children
        delete item.children
        deep(item._children!)
      }
    })
  }
  deep(data)
  return data
}

/**
 * 加载子节点
 * @param row .
 */
async function loadChild(row: any, _: TreeNode, resolve: (data: any[]) => void) {
  resolve(row._children || [])
}
function formSuccess() {
  plusPageRef.value?.getList()
}

onBeforeMount(() => {
  loadDict(dictKeys)
})
</script>

<template>
  <div class="main">
    <PlusPage
      ref="plusPageRef"
      :columns="tableColumns"
      :request="loadData"
      :pagination="false"
      :table="{
        lazy: true,
        treeProps: { children: 'children', hasChildren: 'hasChildren' },
        actionBar: { buttons: tableActionButtions, fixed: 'right' },
        load: loadChild,
      }"
    >
      <template #table-title>
        <el-button type="primary" @click="handleAddNew()">
          <template #icon>
            <ReIcon icon="i-ep:plus" class="el-icon" />
          </template>
          新增
        </el-button>
      </template>
      <template #plus-cell-menuType="scoped">
        <ElTag>{{ menuTypeOptions.find(item => item.value === scoped.value)?.label }}</ElTag>
      </template>
      <template #plus-cell-icon="{ value }">
        <ReIcon :icon="value" />
      </template>
    </PlusPage>
    <Form
      v-model="currentInfo"
      v-model:visible="dialogFormVisible"
      :dialog-form-title="currentInfo.id ? '编辑权限' : '新增权限'"
      @success="formSuccess"
    />
  </div>
</template>
