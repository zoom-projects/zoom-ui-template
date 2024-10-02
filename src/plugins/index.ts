import type { App } from 'vue'

import i18n from '@/i18n'
import router from '@/router'
import { setupStore } from '@/store'
import { MotionPlugin } from '@vueuse/motion'
import './ep'
import './unocss'
import './svg'

export default {
  install(app: App<Element>) {
    // Mount router
    app.use(router)
    // mount i18n
    app.use(i18n)
    // mount pinia store
    setupStore(app)
    // vueuse motion
    app.use(MotionPlugin)
  },
}
