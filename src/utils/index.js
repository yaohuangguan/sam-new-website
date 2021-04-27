import dayjs from 'dayjs'

/**
 * 日期格式化
 * @param {*} timestamp
 */
export function formatTime(timestamp) {
  return timestamp ? dayjs(Number(timestamp)).format('YYYY年MM月DD日') : ''
}

/**
 * 类型检测
 * @param {*} data
 */
export function type(data) {
  var toString = Object.prototype.toString
  var dataType =
    data instanceof Element
      ? 'element'
      : toString
          .call(data)
          .replace(/\[object\s(.+)\]/, '$1')
          .toLowerCase()
  return dataType
}

/**
 * 把query转成对象
 * @param {String} searchStr
 * @returns {Object}
 */
export function convertQueryToObject(searchStr = '') {
  const obj = {}
  searchStr
    .substring(1)
    .split('&')
    .filter((i) => i)
    .map((i) => {
      const tpl = i.split('=')
      obj[tpl[0]] = tpl[1]
      return null
    })
  return obj
}

/**
 * 序列化FormData对象
 * @param {Object} formData
 */
export const serialize = (formData) => {
  const obj = {}
  formData.forEach((val, key) => {
    obj[key] = val
  })
  return obj
}

/**
 * 计算窗口位置
 */
export function handleResizeDocument() {
  const bodyElement = document.body
  const { left, top, right, bottom, x, y } = bodyElement.getBoundingClientRect()
  const rect = {
    height: bottom - top,
    width: right - left,
    left,
    top,
    right,
    bottom,
    x,
    y,
  }
  return rect
}

export * from './portal-dom'
export * from './routes'
export * from './layout'
export * from './event'