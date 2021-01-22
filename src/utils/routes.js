import Splash from '../pages/splash'
import Main from '../pages/main'
import Setting from '../pages/setting'
import { CrateMarker, CreateMarker, UpdateMarker } from '../pages/mark'

// 路由表
export const routes = [
  {
    exact: true,
    path: '/',
    name: '开屏页',
    component: Splash,
    effect: 'none',
    timeout: 0,
  },
  {
    path: '/main',
    name: '主程',
    component: Main,
    effect: 'none',
    timeout: 0,
    routes: [
      {
        path: '/main/setting',
        name: '设置',
        component: Setting,
        effect: 'right',
        timeout: 132,
      },
      {
        path: '/main/marker/create/:date',
        name: '创建标志',
        component: CreateMarker,
        effect: 'right',
        timeout: 132,
      },
      {
        path: '/main/marker/update/:id',
        name: '修改标志',
        component: UpdateMarker,
        effect: 'right',
        timeout: 132,
      },
    ],
  },
]
