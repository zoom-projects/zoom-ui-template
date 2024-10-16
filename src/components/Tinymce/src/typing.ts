import type { RawEditorOptions } from 'tinymce/tinymce'

export interface TinymceProps {
  /**
   * tinymce编辑器的配置项
   */
  options?: RawEditorOptions
  /**
   * tinymce编辑器的内容
   */
  value?: string
  /**
   * tinymce 工具栏
   */
  toolbar?: string[] | string
  /**
   * tinymce 插件
   */
  plugins?: string[] | string
  /**
   * tinymce 菜单栏
   */
  menubar?: string[] | string
  /**
   * 传入的默认值
   */
  modelValue?: string
  /**
   * tinymce编辑器的高度
   */
  height?: string | number
  /**
   * tinymce编辑器的宽度
   */
  width?: string | number
  /**
   * 是否显示上传图片按钮
   */
  showImageUpload?: boolean
  /**
   * 是否聚焦
   */
  autoFocus?: boolean
}
