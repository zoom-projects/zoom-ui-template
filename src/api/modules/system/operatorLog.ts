import type { ResPage, System } from '../../types'
import http from '@/api'
import qs from 'qs'
import { SERVER1 } from '../../config/server'

export function currentPage(query?: System.OperatorLogQuery) {
  return http.get<ResPage<System.ResOperatorLog>>(`${SERVER1}/auth/user/operator_log/page`, query, {
    paramsSerializer: (params: any) => qs.stringify(params, { arrayFormat: 'brackets' }),
  })
}

// export function page(query: System.OperatorLogQuery) {
//   return http.get<ResPage<System.ResOperatorLog>>(`${SERVER1}/operatorLog/page`, { params: query })
// }
