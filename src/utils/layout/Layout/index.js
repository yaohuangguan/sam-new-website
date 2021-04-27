import React from 'react'
import style from './style.module.scss'

// 渲染状态栏
const renderStatusBar = ({
  statusBarHeight = window.NativeBridge
    ? window.NativeBridge.getStatusBarHeight() / window.NativeBridge.getDesity()
    : 0,
  statusBarColor = '#ffda44',
}) => (
  <div
    style={{
      height: statusBarHeight,
      backgroundColor: statusBarColor,
    }}
  />
)

export const Layout = (props) => (
  <div
    className={style['layout']}
    style={{
      position: props.position,
      width: props.width,
      height: props.height,
      backgroundColor: props.backgroundColor,
      backgroundImage: props.backgroundImage,
      overflow: props.overflow,
      ...props.style,
    }}
  >
    {/* 状态栏 */}
    {!props.translucent && renderStatusBar({})}

    {/* 顶部 */}
    {props.header ? (
      <div
        className={
          props.fixed
            ? style['layout__t--fixed']
            : style['layout__t'] + ` ${props.tClassName || ''}`
        }
        style={{ ...props.tstyle }}
        // style={{ zIndex: props.tIndex }}
      >
        {props.header}
      </div>
    ) : null}
    {/* 中间 */}
    <div
      className={style['layout__c'] + ` ${props.cClassName || ''}`}
      style={{
        // zIndex: props.cIndex
        position: props.cposition,
        overflow: props.coverflow,
        ...props.cstyle,
      }}
    >
      {props.children}
    </div>
    {/* 底部 */}
    {props.footer ? (
      <div
        className={style['layout__b']}
        // style={{ zIndex: props.bIndex }}
      >
        {props.footer}
      </div>
    ) : null}
  </div>
)
