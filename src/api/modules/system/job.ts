import type { ResPage, System } from '../../types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

export function page(query?: System.JobQuery) {
  return http.get<ResPage<System.ResJob>>(`${SERVER1}/sys/job/page`, query)
}

export function list(query?: System.JobQuery) {
  return http.get<System.ResJob[]>(`${SERVER1}/sys/job/list`, query)
}

export function save(data: System.ReqJobForm) {
  return http.post(`${SERVER1}/sys/job/save`, data)
}

export function update(id: string, data: System.ReqJobForm) {
  return http.put(`${SERVER1}/sys/job/update/${id}`, data)
}

export function remove(id: string) {
  return http.delete(`${SERVER1}/sys/job/delete`, { id })
}

export function start(id: string) {
  return http.put(`${SERVER1}/sys/job/operate/start`, { id })
}

export function pause(id: string) {
  return http.put(`${SERVER1}/sys/job/operate/pause`, { id })
}

export function run(id: string) {
  return http.put(`${SERVER1}/sys/job/operate/run`, { id })
}
