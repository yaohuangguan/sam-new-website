import Splash from '../pages/splash'
import Main from '../pages/main'

// 路由表
export const routes = [
 
  {
    path: '/',
    name: '主程',
    component: Main,
    effect: 'none',
    timeout: 0,
    routes: [
      {
        exact: true,
        path: '/secret-place',
        name: '开屏页',
        component: Splash,
        effect: 'none',
        timeout: 0,
      },
      {
        path: '/blog',
        name: '博客',
        component: Splash,
        effect: 'none',
        timeout: 0,
      },
    ],
  },
]
