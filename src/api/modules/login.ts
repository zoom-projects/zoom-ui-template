import authMenuList from '@/mock/data/authMenuList.json'
// 获取菜单列表
export function getAuthMenuListApi() {
  // return http.get<Menu.MenuOptions[]>(PORT1 + `/menu/list`, {}, { loading: false });
  // 如果想让菜单变为本地数据，注释上一行代码，并引入本地 authMenuList.json 数据
  return authMenuList
}
