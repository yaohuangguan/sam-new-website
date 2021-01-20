import Splash from '../pages/splash'
import Main from '../pages/main'
import Setting from '../pages/setting'

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
    ],
  },
]
