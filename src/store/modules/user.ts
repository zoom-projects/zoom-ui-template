import { store, useKeepAliveStore, useTabsStore } from '..'
import piniaPersistConfig from '../helper/persist'
import { HOME_URL } from '/src/config'
import router from '/src/router'
import { initDynamicRouter } from '/src/router/modules/dynamicRouter'
import { LoginType } from '/src/utils/enums'

export const useUserStore = defineStore(
  'zoom-user',
  () => {
    const tabsStore = useTabsStore()
    const keepAliveStore = useKeepAliveStore()
    // 登录类型
    const loginType = ref<LoginType>(LoginType.username)

    const token = ref('')
    function setToken(value: string) {
      token.value = value
    }
    const userInfo = ref({})

    /**
     * 登录成功后的操作
     */
    async function afterLogin() {
      // 1.添加动态路由
      await initDynamicRouter()
      // 2.清空 tabs、keepAlive 数据
      tabsStore.setTabs([])
      keepAliveStore.setKeepAliveName([])
      // 3.跳转到首页
      router.push(HOME_URL)
    }

    return {
      loginType,
      token,
      userInfo,
      setToken,
      afterLogin,
    }
  },
  {
    persist: piniaPersistConfig('zoom-user'),
  },
)

export function userStoreHook() {
  return useUserStore(store)
}
