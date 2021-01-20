import axios from 'axios'
import Toast from '../components/Toast'
import { store, resetUserInfo, goToLoginPage, goToConsultingPage } from '../redux'

axios.defaults.timeout = 10000
axios.defaults.headers.common.platform = 'h5'

axios.interceptors.request.use(request => {
  // console.log('axios.interceptors.request', request, Cookies.get())
  // Cookies.set('token', 'eyJ1c3JJZCI6MTEyNzg1MzM0NjAwMzA5MTQ1Niwic291cmNlIjoicGhvbmVMb2dpbiIsImFsZyI6IkhTMjU2In0.eyJleHAiOjE1NzM1NDU5NjgsImlhdCI6MTU3Mjk0MTE2OH0.gDbyr83BlWmcN-21xkccwZwZvQEjqCIMomY3q2UKQSw')
  const localUserInfo = JSON.parse(localStorage.getItem('userInfo') || 'null') || {}
  const { token } = localUserInfo
  if (token) {
    request.headers.token = token
  }
  request.headers.platform = 'h5'
  return request
}, error => {
  console.log('interceptors request error')
})

/**
 * 响应拦截
 * 说明
 * code "0" 为成功
 * code "-1" 为失败
 * code "-999" token为空，请重新登录
 * code "-998" token过期，请重新登录
 * code "-997" 您的账号在其他设备登录，若非本人操作请注意修改密码
 * code "-996" 您的账户已被冻结，若有疑问请联系客服
 * code "-994" 邀约失效，您可联系投顾经理详细咨询
 * 
 * code "0" msgKey "-995" 领航者无账号，跳转到预约咨询页面
 * code "0" msgKey "-994" 邀约失效，您可联系投顾经理详细咨询
 */
axios.interceptors.response.use(response => {
  // console.log('axios.interceptors.response', response)
  switch (response.data.code) {
    case '0': {
      return Promise.resolve(response.data.data)
    }
    case '-1': {
      switch (response.data.msgKey) {
        case '-995': {
          goToConsultingPage(store.dispatch)
          return Promise.reject('Permission denied')
        }
        case '20057': {
          Toast.info(response.data.msg)
          return Promise.reject('请求过于频繁，请稍后再试')
        }
        default: break
      }
      return Promise.reject(response.data)
    }
    case '-999':
    case '-998':
    case '-997':
    case '-996': {
      Toast.info(response.data.msg)
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      resetUserInfo(store.dispatch)
      goToLoginPage(store.dispatch)
      return Promise.reject('Permission denied')
    }
    default:
      return Promise.reject('Permission denied')
  }
}, error => {
  // console.log('response error')
  return Promise.reject(error && error.response && error.response.data)
})

export const request = ({ method, url, headers, data, params }) => {
  const config = {
    headers,
    method,
    url
  }
  switch (method) {
    case 'GET': config.params = data; break
    case 'POST': config.data = data; break
    case 'PUT': config.data = data; break
    case 'PATCH': config.data = data; break
    case 'DELETE': config.data = data; break
    default: break
  }
  return axios(config).catch(error => {
    console.error(error)
    throw error
  })
}

export default request