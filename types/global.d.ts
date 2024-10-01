declare global {
  type Recordable<T = any> = Record<string, T>

  /* Menu */
  declare namespace Menu {
    interface MenuOptions {
      path: string
      name: string
      component?: string | (() => Promise<unknown>)
      redirect?: string
      meta: MetaProps
      children?: MenuOptions[]
    }
    interface MetaProps {
      icon: string
      title: string
      activeMenu?: string
      isLink?: string
      isHide: boolean
      isFull: boolean
      isAffix: boolean
      isKeepAlive: boolean
    }
  }

  /* TabsMenuProps */
  declare namespace Tabs{
    interface TabsMenuProps {
      icon: string
      title: string
      path: string
      name: string
      close: boolean
      isKeepAlive: boolean
    }
  }
}

export {}
