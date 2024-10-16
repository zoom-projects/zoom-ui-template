import type { ResPage, System } from '../../types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

export function hasCode(code: string, id?: string) {
  return http.get(`${SERVER1}/sys/message/template/has_code`, { code, id })
}

export function page(query?: System.MessageTemplateQuery) {
  return http.get<ResPage<System.ResMessageTemplate>>(`${SERVER1}/sys/message/template/page`, query)
}

export function list(query?: System.MessageTemplateQuery) {
  return http.post<System.ResMessageTemplate[]>(`${SERVER1}/sys/message/template/list`, query)
}

export function save(data: System.ReqMessageTemplateForm) {
  return http.post(`${SERVER1}/sys/message/template/save`, data)
}

export function update(id: string, data: System.ReqMessageTemplateForm) {
  return http.put(`${SERVER1}/sys/message/template/update/${id}`, data)
}

export function remove(id: string) {
  return http.delete(`${SERVER1}/sys/message/template/del`, { id })
}
