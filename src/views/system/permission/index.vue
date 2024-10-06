<script setup lang="ts">
import type { System } from '/src/api/types'
import type { TreeNode } from 'element-plus'
import type { ActionBarButtonsRow, PlusColumn, PlusPage } from 'plus-pro-components'
import type { FormItemProps } from './utils/type'
import * as permissionApi from '@/api/modules/system/permission'
import Form from './form.vue'
import { menuTypeOptions } from './utils/enums'
import { logicOptions } from '/src/enums/logicEnums'

const plusPageRef = ref<InstanceType<typeof PlusPage>>()

const maps = new Map()
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
    hideInSearch: true,
  },
  {
    label: '排序',
    prop: 'sort',
    hideInSearch: true,
  },
  {
    label: '隐藏',
    prop: 'hidden',
    hideInSearch: true,
    valueType: 'select',
    options: logicOptions,
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
  data.forEach((item: any) => {
    if (!item.leaf) {
      item.hasChildren = true
    }
  })
  return { data, success, total: 0 }
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
  refreshLoadTree(row.parentId)
}

/**
 * 加载子节点
 * @param row .
 */
async function loadChild(row: any, treeNode: TreeNode, resolve: (data: any[]) => void) {
  // 将当前选中节点数据存储到map中
  maps.set(row.id, { row, treeNode, resolve })
  const params: System.PermissionQuery = { parentId: row.id }
  const { data } = await permissionApi.list(params)
  data.forEach((item: any) => {
    if (!item.leaf) {
      item.hasChildren = true
    }
  })
  resolve(data)
}
function refreshLoadTree(parentId: string) {
  if (!parentId) {
    plusPageRef.value?.getList()
    return
  }
  if (maps.get(parentId)) {
    const { row, treeNode, resolve } = maps.get(parentId)
    const lazyTreeNodeMap = plusPageRef.value?.plusTableInstance?.tableInstance?.store?.states?.lazyTreeNodeMap
    if (lazyTreeNodeMap) {
      lazyTreeNodeMap.value[parentId] = []
    }
    if (row) {
      loadChild(row, treeNode, resolve)
      if (row.parentId) {
        const node: any = maps.get(row.parentId) || {}
        loadChild(node.row, node.treeNode, node.resolve)
      }
    }
  }
  else {
    // 把数据加到父级节点上去
    const store = plusPageRef.value?.plusTableInstance?.tableInstance?.store
    const parentNode = store.states.treeData.value[parentId]
    // 如果在已加载过的节点的子节点中
    if (parentNode) {
      if (parentNode.loaded) {
        store.states.lazyTreeNodeMap.value[parentId].push(currentInfo.value)
      }
    }
    else {
      store.states.treeData.value[parentId] = {
        children: [],
        display: true,
        expanded: false,
        lazy: true,
        level: 0,
        loaded: false,
        loading: false,
      }
    }
  }
}
function formSuccess() {
  refreshLoadTree(currentInfo.value.parentId!)
}
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
      @success="formSuccess"
    />
  </div>
</template>
