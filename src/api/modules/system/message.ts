import type { ResPage, System } from '../../types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

export function page(query?: System.MessageQuery) {
  return http.get<ResPage<System.ResMessage>>(`${SERVER1}/sys/message/page`, query)
}

export function decrypt(content: string) {
  return http.get(`${SERVER1}/sys/message/decrypt`, { content })
}

export function remove(id: string) {
  return http.delete(`${SERVER1}/sys/message/delete`, { id })
}
