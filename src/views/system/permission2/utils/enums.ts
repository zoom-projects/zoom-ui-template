export const menuTypeOptions = [
  {
    label: '菜单',
    value: 0,
  },
  {
    label: 'frame',
    value: 1,
  },
  {
    label: '外链',
    value: 2,
  },
  {
    label: '按钮',
    value: 3,
  },
]

export const affixOptions = [
  {
    label: '固定',
    tip: '当前菜单名称固定显示在标签页且不可关闭',
    value: true,
  },
  {
    label: '不固定',
    tip: '当前菜单名称不固定显示在标签页且可关闭',
    value: false,
  },
]

export const keepAliveOptions = [
  {
    label: '缓存',
    tip: '会保存该页面的整体状态，刷新后会清空状态',
    value: true,
  },
  {
    label: '不缓存',
    tip: '不会保存该页面的整体状态',
    value: false,
  },
]

export const hiddenTagOptions = [
  {
    label: '展示',
    tip: '当前菜单名称或自定义信息允许添加到标签页',
    value: false,
  },
  {
    label: '隐藏',
    tip: '当前菜单名称或自定义信息禁止添加到标签页',
    value: true,
  },
]

export const fullOptions = [
  {
    label: '全屏',
    tip: '当前页面全屏显示(适合展示大量数据)',
    value: true,
  },
  {
    label: '不全屏',
    tip: '当前页面不全屏显示',
    value: false,
  },
]
