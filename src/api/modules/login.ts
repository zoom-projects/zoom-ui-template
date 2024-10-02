import type { Login } from '../types'
import http from '@/api'
import authMenuList from '@/mock/data/authMenuList.json'
import { SERVER1 } from '../config/server'
import { random } from '/src/utils'
import { AES, SHA, str2Hex } from '/src/utils/crypto'

/**
 *  用户名登录
 * @param params .
 */
export async function loginApiByUsername(params: Login.ReqLoginForm) {
  const timestamp = new Date().getTime()
  const iv = random(16)
  const _key = await SHA.has256Hex(iv + timestamp)
  const _iv = await str2Hex(iv)
  const data = await AES.encryptHex(params.password, _key, _iv)
  return http.post<string>(`${SERVER1}/sys/auth/login`, {
    username: params.username,
    password: data,
    captchaKey: iv,
    timestamp,
  }, { loading: false })
}

// 获取菜单列表
export function getAuthMenuListApi() {
  // return http.get<Menu.MenuOptions[]>(PORT1 + `/menu/list`, {}, { loading: false });
  // 如果想让菜单变为本地数据，注释上一行代码，并引入本地 authMenuList.json 数据
  return authMenuList
}
