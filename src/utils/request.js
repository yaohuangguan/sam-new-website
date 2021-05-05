import axios from 'axios'

axios.defaults.timeout = 10000

axios.interceptors.request.use(request => {
  const localUserInfo = JSON.parse(localStorage.getItem('userInfo') || 'null') || {}
  const { token } = localUserInfo
  if (token) {
    request.headers.token = token
  }
  return request
}, error => {
  console.log('interceptors request error')
})

// TODO
axios.interceptors.response.use(response => {
  return response
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