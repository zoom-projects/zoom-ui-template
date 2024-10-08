import type { App } from 'vue'

import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
/**
 *  @description 注册全局指令
 * @param app
 */
export function setupDirectives(app: App) {
  // 注册vue-tippy 指令
  app.use(VueTippy)
}
