import type { App, Plugin } from 'vue'

declare type SFCWithInstall<T> = T & Plugin & component

declare interface component {
  name: string
}

/**
 * @description: 注册全局组件
 * @param comp 组件
 * @returns 组件
 */
export function withInstall<T extends component>(comp: T): Plugin {
  ;(comp as SFCWithInstall<T>).install = (app: App): void => {
    app.component(comp.name, comp)
  }
  return comp as SFCWithInstall<T>
}
