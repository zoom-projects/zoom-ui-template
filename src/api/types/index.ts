// 请求响应参数（不包含data）
export interface Result {
  code: string
  msg: string
  success: boolean
  timestamp: number
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T
}

// 分页响应参数
export interface ResPage<T> {
  list: T[]
  pageNum: number
  pageSize: number
  total: number
}

// 分页请求参数
export interface ReqPage {
  pageNum: number
  pageSize: number
}

// 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string
  }
}

// 登录模块
export namespace Login {
  export interface ReqLoginForm {
    username: string
    password: string
  }
  export interface ReqLoginPhoneForm {
    phone: string
    code: string
  }

  export interface ResLogin {
  }
}

/**
 * 系统模块
 */
export namespace System {
  export interface PermissionQuery {
    title?: string
    parentId?: number
    menuType?: number
  }
  export interface ReqPermissionForm {
    /**
     * 菜单类型
     */
    menuType?: number
    /**
     * 菜单名称
     */
    title?: string
    /**
     * 路由名称
     */
    routeName?: string
    /**
     * 路由地址
     */
    routePath?: string
    /**
     * 菜单图标
     */
    icon?: string
    /**
     * 菜单排序
     */
    sort?: number
    /**
     * id
     */
    id?: string
    /**
     * 父级id
     */
    parentId?: string
    /**
     * 是否隐藏
     */
    hidden?: boolean
    /**
     * 是否缓存
     */
    keepAlive?: boolean
    /**
     * 是否全屏
     */
    fullScreen?: boolean
  }

  export interface PermissionTree {
    id: string
    title: string
    parentId: string
    children: PermissionTree[]
  }
}
