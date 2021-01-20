import { apiActionSplit } from './helper'

const LOGIN_BY_PHONE_PASSWORD = apiActionSplit('LOGIN_BY_PHONE_PASSWORD')
const LOGIN_BY_PHONE_SMSCODE = apiActionSplit('LOGIN_BY_PHONE_SMSCODE')
const ASYNC_USER = 'ASYNC_USER'
const GOT_TO_LOGIN_PAGE = 'GOT_TO_LOGIN_PAGE'
const GOT_TO_CONSULTING_PAGE = 'GOT_TO_CONSULTING_PAGE'
const GET_USER_INFO = apiActionSplit('GET_USER_INFO')
const RESET_USER_INFO = 'RESET_USER_INFO'
const USER_LOGOUT_OUT = 'USER_LOGOUT_OUT'

const initUserInfo = () => ({
  token: ''
})
const init = () => ({
  userInfo: initUserInfo()
})

const goToPage = (path) => {
  window.root.history.push(path)
}

/**
 * 同步用户信息
 * @param {*} dispatch 
 * @param {*} data 
 */
export const asyncUser = (dispatch, data) => {
  try {
    const localUserInfo = JSON.parse(localStorage.getItem('userInfo') || 'null') || initUserInfo()
    const localToken = localUserInfo.token
    const paramToken = data && data.token
    if (paramToken || localToken) {
      // KangarooAccountStatusController.GET_CheckStatusToken({
      //   token: paramToken || localToken
      // }).then(res => {
      //   if (res && res.code === '0') {
      //     console.log('校验token 未过期')
      //     const userInfo = res.data
      //     localStorage.setItem('userInfo', JSON.stringify(userInfo))
      //     dispatch({ type: ASYNC_USER, data: userInfo })
      //   } else {
      //     localStorage.removeItem('userInfo')
      //     dispatch({ type: ASYNC_USER, data: initUserInfo() })
      //     console.log('校验token 已过期')
      //   }
      // }).catch(error => {
      //   console.log('校验token失败', error)
      //   localStorage.removeItem('userInfo')
      //   dispatch({ type: ASYNC_USER, data: initUserInfo() })
      // })
    } else {
      dispatch({ type: ASYNC_USER, data: initUserInfo() })
      console.log('未登录')
    }
  } catch (error) {
    console.log('校验token失败', error)
    dispatch({ type: ASYNC_USER, data: initUserInfo() })
  }
}

/**
 * 跳转到登录页
 * @param {*} dispatch 
 * @param {*} data 
 */
export const goToLoginPage = (dispatch, data) => {
  dispatch({ type: GOT_TO_LOGIN_PAGE, data })
  goToPage(`${window.root.history.location.pathname}/login`)
}

/**
 * 跳转到服务咨询页
 * @param {*} dispatch 
 * @param {*} data 
 */
export const goToConsultingPage = (dispatch, data) => {
  dispatch({ type: GOT_TO_CONSULTING_PAGE, data })
  goToPage(`${window.root.history.location.pathname}/service-consulting`)
}

/**
 * 手机号+密码 登录
 * @param {*} dispatch 
 * @param {*} data 
 */
export const loginByPhonePassword = (dispatch, data = {}) => {
  // const { formData, onStart, onSuccess, onFail } = data
  // const ACTION = LOGIN_BY_PHONE_PASSWORD
  // onStart && onStart()
  // return KangarooUserLoginController.POST_LoginLoginByPassword(formData)
  //   .then(res => {
  //     localStorage.setItem('userInfo', JSON.stringify(res))
  //     dispatch({ type: ACTION.SUCCESS, data: res })
  //     onSuccess && onSuccess(res)
  //     asyncUser(dispatch)
  //     return res
  //   }).catch(error => {
  //     dispatch({ type: ACTION.FAIL, data: error })
  //     onFail && onFail(error)
  //   })
}

/**
 * 手机号+验证码 登录
 * @param {*} dispatch 
 * @param {*} data 
 */
export const loginByPhoneSMSCode = (dispatch, data = {}) => {
  // const { formData, onStart, onSuccess, onFail } = data
  // const ACTION = LOGIN_BY_PHONE_SMSCODE
  // onStart && onStart()
  // return KangarooUserLoginController.POST_LoginLoginWithVerifyCode(formData)
  //   .then(res => {
  //     localStorage.setItem('userInfo', JSON.stringify(res))
  //     dispatch({ type: ACTION.SUCCESS, data: res })
  //     onSuccess && onSuccess(res)
  //     asyncUser(dispatch)
  //     return res
  //   }).catch(error => {
  //     dispatch({ type: ACTION.FAIL, data: error })
  //     onFail && onFail(error)
  //   })
}

/**
 * 获取用户信息
 * @param {*} dispatch 
 * @param {*} data 
 */
export const getUserInfo = (dispatch, data = {}) => {
  // const { formData, onStart, onSuccess, onFail } = data
  // const ACTION = GET_USER_INFO
  // onStart && onStart()
  // return KangarooUserAccountOperController.GET_UserGetUserInfo(formData)
  //   .then(res => {
  //     dispatch({ type: ACTION.SUCCESS, data: res })
  //     onSuccess && onSuccess(res)
  //     return res
  //   }).catch(error => {
  //     dispatch({ type: ACTION.FAIL, data: error })
  //     onFail && onFail(error)
  //   })
}

/**
 * 重置用户信息
 * @param {*} dispatch 
 * @param {*} data 
 */
export const resetUserInfo = (dispatch, data) => {
  dispatch({ type: RESET_USER_INFO, data: initUserInfo() })
}

/**
 * 退出登录
 * @param {*} dispatch 
 * @param {*} data 
 */
export const userLogout = (dispatch, data) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT_OUT, data: initUserInfo() })
}

export default function reducer(state = init(), action) {
  switch (action.type) {
    case USER_LOGOUT_OUT:
    case RESET_USER_INFO: {
      const oldState = JSON.parse(JSON.stringify(state))
      const newState = Object.assign(oldState, {
        userInfo: action.data
      })
      return newState
    }
    case GET_USER_INFO.START:
    case GET_USER_INFO.SUCCESS: {
      const oldState = JSON.parse(JSON.stringify(state))
      const newState = Object.assign(oldState, {
        userInfo: action.data
      })
      return newState
    }
    case GOT_TO_LOGIN_PAGE: {
      return state
    }
    case LOGIN_BY_PHONE_PASSWORD.SUCCESS: {
      const oldState = JSON.parse(JSON.stringify(state))
      const newState = Object.assign(oldState, {
        userInfo: action.data
      })
      return newState
    }
    case LOGIN_BY_PHONE_SMSCODE.SUCCESS: {
      const oldState = JSON.parse(JSON.stringify(state))
      const newState = Object.assign(oldState, {
      })
      return newState
    }
    case ASYNC_USER: {
      const oldState = JSON.parse(JSON.stringify(state))
      const newState = Object.assign(oldState, {
        userInfo: action.data
      })
      return newState
    }
    default: return state
  }
}