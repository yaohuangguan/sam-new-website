import React, { useState, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import { matchPath } from 'react-router'
import uuidv4 from 'uuid/v4'
import { Route } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { Provider } from 'react-redux'
import { Layout } from '../layout'
import { store } from '../../redux'
import style from './style.module.scss'

/**
 * DOM Portal 把children渲染在body下，hooks 版本
 * @param {*} props 需要传递的props
 */
export function PortalDOMHooks(props) {
  const { maskId, children } = props
  const [portalNode] = useState(document.createElement('div'))
  useLayoutEffect(() => {
    portalNode.setAttribute('id', maskId)
    portalNode.className = style['page']
    document.body.appendChild(portalNode)
    return () => {
      ReactDOM.unmountComponentAtNode(portalNode)
      document.body.removeChild(portalNode)
    }
  }, [])
  useLayoutEffect(() => {
    ReactDOM.render(ReactDOM.createPortal(children, portalNode), portalNode)
  }, [props])
  return null
}

/**
 * DOM Portal 把children渲染在body下，class 版本
 * @param {*} props 需要传递的props
 */
export class PortalDOMClass extends React.Component {
  constructor(props) {
    super(props)
    const portalNode = document.createElement('div')
    portalNode.setAttribute('id', props.maskId)
    portalNode.className = style['page']
    document.body.appendChild(portalNode)
    this.portalNode = portalNode
  }
  portal = () => {
    ReactDOM.render(
      ReactDOM.createPortal(this.props.children, this.portalNode),
      this.portalNode
    )
  }
  componentDidMount() {
    this.portal()
  }
  componentDidUpdate() {
    this.portal()
  }
  render() {
    return null
  }
}

/**
 * 用于做动画
 * @param {*} props
 */
export function PortalUtil(props) {
  const [visible, setVisible] = useState(props.visible || false)
  const maskId = uuidv4()
    .split('-')
    .reduce((prev, next) => prev + next.charAt(0), '')
  const { children } = props.children({ setVisible }).props
  return (
    <React.Fragment>
      {children[0]}
      <PortalDOMHooks {...{ ...props, maskId }}>
        <CSSTransition
          unmountOnExit
          classNames="up"
          timeout={132}
          in={visible}
          children={<Layout {...props}>{children[1]}</Layout>}
        />
      </PortalDOMHooks>
    </React.Fragment>
  )
}

/**
 * 获取UUID 简版
 */
export function generateUUID() {
  return uuidv4()
    .split('-')
    .reduce((prev, next) => prev + next.charAt(0), '')
}

/**
 * 获取UUID
 */
export function generateUUIDV4() {
  return uuidv4()
}

export function Page(props) {
  const { rect: { width, height }, children } = props
  return (
    <div style={{ width, height }}>
      {children}
    </div>
  )
}

/**
 * 路由渲染
 * @param {*} routes 路由
 * @param {*} superProps 上级props
 */
export function renderRoutes(routes, superProps) {
  return routes.map((item, index) => {
    return [
      <Route
        key={item.path}
        name={item.name}
        path={item.path}
        exact={item.exact}
        children={(props) => {
          return (
            <PortalDOMHooks maskId={generateUUID()}>
              <CSSTransition
                unmountOnExit
                in={!!props.match}
                classNames={item.effect}
                timeout={item.timeout}
              >
                <Page {...superProps}>
                  <Provider store={store}>
                    <item.component
                      key={index}
                      {...superProps}
                      {...props}
                      translucent={item.translucent}
                    />
                  </Provider>
                </Page>
              </CSSTransition>
            </PortalDOMHooks>
          )
        }}
      />,
      ...renderRoutes(item.routes || [], superProps),
    ]
  })
}



/**
 * 从route path获取路由信息
 * @param {String} routePath
 * @returns {Object} 返回路由对象
 */
export const getRouteByRoutePath = (path, routes) => {
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].path === path) {
      return routes[i]
    } else if (routes[i].routes) {
      const res = getRouteByRoutePath(path, routes[i].routes)
      if (res) return res
    }
  }
}

// /**
//  * 从route path获取路由层级信息
//  * @param {String} routePath 
//  * @returns {Array} 返回路由对象Array
//  */
// export const getRoutesByRoutePath = routePath => {
//   function findPrevRoute(data, path) {
//     for (var i in data) {
//       if (data[i].path === path) {
//         return [data[i]]
//       }
//       if (data[i].routes) {
//         var res = findPrevRoute(data[i].routes, path)
//         if (res) return res.concat(data[i])
//       }
//     }
//   }
//   return (findPrevRoute(routes, routePath) || []).reverse() || []
// }

/**
 * 从route url获取路由层级信息
 * @param {String} routeUrl
 * @returns {Array} 返回路由对象Array
 */
export const getRoutesByRouteUrl = (routes, routeUrl) => {
  function findPrevRoute(data, path) {
    for (var i in data) {
      if (matchPath(routeUrl, { ...data[i], exact: true })) {
        return [data[i]]
      }
      if (data[i].routes) {
        var res = findPrevRoute(data[i].routes, path)
        if (res) return res.concat(data[i])
      }
    }
  }
  return (findPrevRoute(routes, routeUrl) || []).reverse() || []
}