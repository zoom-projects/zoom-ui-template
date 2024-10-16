<script setup lang="ts">
import type { RawEditorOptions } from 'tinymce/tinymce'
import type { TinymceProps } from './typing'
import { buildShortUUID } from '@/utils'
import { isNumber } from '@/utils/is'
import Editor from '@tinymce/tinymce-vue'
import tinymce from 'tinymce/tinymce'
import { bindHandlers } from './helper'

import { menubar, simplePlugins, simpleToolbar } from './tinymce'
import 'tinymce/themes/silver'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default'
import 'tinymce/models/dom'

// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
// 全屏插件
import 'tinymce/plugins/fullscreen'
// 链接插件
import 'tinymce/plugins/link'
// 列表插件
import 'tinymce/plugins/lists'
// 预览插件
import 'tinymce/plugins/preview'
// 图片插件
import 'tinymce/plugins/image'
import { onMountedOrActivated } from '/src/hooks/onMountedOrActivated'

const props = withDefaults(defineProps<TinymceProps>(), {
  options: () => ({}),
  value: '',
  toolbar: () => simpleToolbar,
  plugins: () => simplePlugins,
  menubar: () => menubar,
  height: 400,
  width: 'auto',
  showImageUpload: false,
  autoFocus: true,
})
const emits = defineEmits(['change', 'update:modelValue', 'inited', 'initError'])
const { attrs } = getCurrentInstance()!

const editorRef = ref<Nullable<any>>(null)
const fullscreen = ref(false)
const tinymceId = ref<string>(buildShortUUID('tiny-vue'))
const elRef = ref<Nullable<HTMLElement>>(null)
const editorRootRef = ref<Nullable<HTMLElement>>(null)
const imgUploadShow = ref(false)
const targetElem = ref<null | HTMLDivElement>(null)

const tinymceContent = computed(() => props.modelValue)
const containerWidth = computed(() => {
  const width = props.width
  if (isNumber(width)) {
    return `${width}px`
  }
  return width
})

const initOptions = computed(() => {
  const { height, options, toolbar, plugins, menubar } = props
  let publicPath = import.meta.env.VITE_PUBLIC_PATH || '/'
  // update-begin--author:liaozhiyang---date:20240320---for：【QQYUN-8571】发布路径不以/结尾资源会加载失败
  if (!publicPath.endsWith('/')) {
    publicPath += '/'
  }
  return {
    selector: `#${unref(tinymceId)}`, // 选择器
    height, // 高度
    toolbar, // 工具栏
    menubar: false, // 菜单栏
    plugins, // 插件
    language: 'zh_CN', // 语言
    language_url: `${publicPath}resources/tinymce/langs/zh_CN.js`, // 语言包
    branding: false, // 品牌推广
    default_link_target: '_blank', // 链接默认打开方式
    link_title: false, // 链接标题
    object_resizing: true, // 对象调整大小
    toolbar_mode: 'sliding', // 工具栏模式
    auto_focus: props.autoFocus, // 自动聚焦
    skin: 'oxide', // 皮肤
    skin_url: `${publicPath}resources/tinymce/skins/ui/oxide`, // 皮肤路径
    content_css: `${publicPath}resources/tinymce/skins/content/default/content.min.css`, // 内容样式
    ...options,
    setup: (editor: any) => {
      editorRef.value = editor
      editor.on('init', (e: any) => initSetup(e))
    },
  } as RawEditorOptions
})

const disabled = computed(() => {
  const { options } = props
  const getdDisabled = options && Reflect.get(options, 'readonly')
  const editor = unref(editorRef)
  // update-begin-author:taoyan date:20220407 for: 设置disabled，图片上传没有被禁用
  if (editor && editor?.setMode) {
    editor.setMode(getdDisabled || attrs.disabled === true ? 'readonly' : 'design')
  }
  if (attrs.disabled === true) {
    return true
  }
  // update-end-author:taoyan date:20220407 for: 设置disabled，图片上传没有被禁用
  return getdDisabled ?? false
})

watch(
  () => attrs.disabled,
  () => {
    const editor = unref(editorRef)
    if (!editor) {
      return
    }
    editor?.setMode && editor.setMode(attrs.disabled ? 'readonly' : 'design')
  },
)

onMountedOrActivated(() => {
  if (!initOptions.value.inline) {
    tinymceId.value = buildShortUUID('tiny-vue')
  }
  nextTick(() => {
    setTimeout(() => {
      initEditor()
    }, 30)
  })
})

function initEditor() {
  const el = unref(elRef)
  if (el && el?.style && el?.style?.visibility) {
    el.style.visibility = ''
  }
  tinymce
    .init(unref(initOptions) as RawEditorOptions)
    .then((editor) => {
      emits('inited', editor)
    })
    .catch((err) => {
      emits('initError', err)
    })
}

function initSetup(e: any) {
  const editor = unref(editorRef)
  if (!editor) {
    return
  }
  const value = props.modelValue || ''

  editor.setContent(value)
  bindModelHandlers(editor)
  bindHandlers(e, attrs, unref(editorRef))
}
function setValue(editor: Recordable, val: string, prevVal?: string) {
  if (editor && typeof val === 'string' && val !== prevVal && val !== editor.getContent({ format: attrs.outputFormat })) {
    editor.setContent(val)
  }
}
function bindModelHandlers(editor: any) {
  const modelEvents = attrs.modelEvents ? attrs.modelEvents : null
  const normalizedEvents = Array.isArray(modelEvents) ? modelEvents.join(' ') : modelEvents

  watch(
    () => props.modelValue,
    (val, prevVal) => {
      setValue(editor, val!, prevVal)
    },
  )

  watch(
    () => props.value,
    (val, prevVal) => {
      setValue(editor, val, prevVal)
    },
    {
      immediate: true,
    },
  )
  editor.on(normalizedEvents || 'change keyup undo redo', () => {
    const content = editor.getContent({ format: attrs.outputFormat })
    const text = editor.getContent({ format: 'text' })
    emits('update:modelValue', content)
    emits('change', { content, text })
  })

  editor.on('FullscreenStateChanged', (e: any) => {
    fullscreen.value = e.state
  })
}
let executeCount = 0
watch(
  () => props.showImageUpload,
  () => {
    mountElem()
  },
)

onMounted(() => {
  mountElem()
})
onBeforeUnmount(() => {
  destory()
})

onDeactivated(() => {
  destory()
})

function destory() {
  if (tinymce !== null) {
    tinymce?.remove?.(unref(initOptions).selector!)
  }
}
function mountElem() {
  if (executeCount > 20)
    return
  setTimeout(() => {
    if (targetElem.value) {
      imgUploadShow.value = props.showImageUpload
    }
    else {
      const toxToolbar = editorRootRef.value?.querySelector('.tox-toolbar__group')
      if (toxToolbar) {
        const divElem = document.createElement('div')
        divElem.setAttribute('style', `width:64px;height:39px;display:flex;align-items:center;`)
        toxToolbar!.appendChild(divElem)
        targetElem.value = divElem
        imgUploadShow.value = props.showImageUpload
        executeCount = 0
      }
      else {
        mountElem()
      }
    }
    executeCount++
  }, 100)
}
</script>

<template>
  <div ref="editorRootRef" class="tinymce-container" :style="{ width: containerWidth }">
    <Editor v-if="!initOptions.inline" :id="tinymceId" ref="elRef" :disabled="disabled" :init="initOptions" :style="{ visibility: 'hidden' }" />
    <slot v-else />
  </div>
</template>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;

  textarea {
    z-index: -1;
    visibility: hidden;
  }
  pre {
    white-space: pre-wrap; /* css-3 */
    white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    word-wrap: break-word; /* Internet Explorer 5.5+ */
  }
  .tox:not(.tox-tinymce-inline) .tox-editor-header {
    padding: 0;
  }

  .tox .tox-tbtn--disabled,
  .tox .tox-tbtn--disabled:hover,
  .tox .tox-tbtn:disabled,
  .tox .tox-tbtn:disabled:hover {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg height='39px' viewBox='0 0 40 39px' width='40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='38px' width='100' height='1' fill='%23d9d9d9'/%3E%3C/svg%3E");
    background-position: left 0;
  }
}
</style>
