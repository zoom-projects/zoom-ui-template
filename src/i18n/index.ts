import { createI18n } from 'vue-i18n'

import zh from './modules/zh-cn'

const i18n = createI18n({
  // Use Composition API, Set to false
  allowComposition: true,
  legacy: false,
  locale: 'zh',
  messages: {
    zh,
  },
})

export default i18n
