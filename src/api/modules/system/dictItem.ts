import type { ResPage, System } from '../../types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

/**
 * 分页查询
 * @param query
 * @returns
 */
export function page(query?: System.DictItemQuery) {
  return http.get<ResPage<System.ResDictItem>>(`${SERVER1}/sys/dict/item/page`, query)
}

/**
 * 列表查询
 * @param query
 * @returns
 */
export function list(query?: System.DictItemQuery) {
  return http.get(`${SERVER1}/sys/dict/item/list`, query)
}

/**
 * 保存
 * @param data
 * @returns
 */
export function save(data: System.ReqDictItemForm) {
  return http.post(`${SERVER1}/sys/dict/item/save`, data)
}

/**
 * 更新
 * @param id
 * @param data
 * @returns
 */
export function update(id: string, data: System.ReqDictItemForm) {
  return http.put(`${SERVER1}/sys/dict/item/update/${id}`, data)
}

/**
 * 删除
 * @param id
 * @returns
 */
export function del(id: string) {
  return http.delete(`${SERVER1}/sys/dict/item/del`, { id })
}
