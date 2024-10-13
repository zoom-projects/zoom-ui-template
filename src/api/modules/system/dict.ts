import type { ResPage, System } from '../../types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

/**
 *  编码是否存在
 * @param code 编码
 * @param id id
 * @returns   编码是否存在
 */
export function hasCode(code: string, id?: string) {
  return http.get(`${SERVER1}/sys/dict/has_code`, { code, id })
}

/**
 * 分页查询
 * @param query
 * @returns
 */
export function page(query?: System.DictQuery) {
  return http.get<ResPage<System.ResDict>>(`${SERVER1}/sys/dict/page`, query)
}
/**
 * 列表查询
 * @param query
 * @returns
 */
export function list(query?: System.DictQuery) {
  return http.get(`${SERVER1}/sys/dict/list`, query)
}

/**
 * 保持
 * @param data
 * @returns
 */
export function save(data: System.ReqDictForm) {
  return http.post(`${SERVER1}/sys/dict/save`, data)
}

/**
 *  更新
 * @param id
 * @param data
 * @returns
 */
export function update(id: string, data: System.ReqDictForm) {
  return http.put(`${SERVER1}/sys/dict/update/${id}`, data)
}

/**
 *  删除
 * @param id
 * @returns
 */
export function del(id: string) {
  return http.delete(`${SERVER1}/sys/dict/del`, { id })
}

/**
 *  获取字典项列表
 * @param dictId 字典id
 * @returns
 */
export function loadDictItem(code: string) {
  return http.get<Array<System.ResDictType>>(`${SERVER1}/sys/dict/load_items`, { dictCode: code })
}

/**
 *  刷新缓存
 * @returns
 */
export function refreshCache() {
  return http.put(`${SERVER1}/sys/dict/refresh_cache`)
}
