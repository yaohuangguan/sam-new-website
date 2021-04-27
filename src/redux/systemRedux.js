import { apiActionSplit } from './helper'

const SYSTEM_INFO = apiActionSplit('SYSTEM_INFO')
const GET_SERVER_CONFIG = apiActionSplit('GET_SERVER_CONFIG')

const initServerConfig = () => ({
  telephoneNumber: '',
  userAgreement: '',
  impStatementUrl: '',
  signBackEmail: '',
  email: '',
})

const init = () => ({
  name: 'systemRedux',
  serverConfig: initServerConfig()
})

export const getSystemInfo = (dispatch, data = {}) => {
  const { formData, onStart, onSuccess, onFail } = data
  const ACTION = SYSTEM_INFO
  dispatch({ type: ACTION.START })
  onStart && onStart()
  return Promise(formData).then(res => {
    dispatch({ type: ACTION.SUCCESS, data: res })
    onSuccess && onSuccess(res)
    return res
  }).catch(error => {
    dispatch({ type: ACTION.FAIL, data: error })
    onFail && onFail(error)
  })
}


export const getServerConfig = (dispatch, data = {}) => {
  // const { formData, onStart, onSuccess, onFail } = data
  // const ACTION = GET_SERVER_CONFIG
  // dispatch({ type: ACTION.START })
  // onStart && onStart()
  // return SysConfController.GET_SysGetAppConf(formData).then(res => {
  //   dispatch({ type: ACTION.SUCCESS, data: res })
  //   onSuccess && onSuccess(res)
  //   return res
  // }).catch(error => {
  //   dispatch({ type: ACTION.FAIL, data: error })
  //   onFail && onFail(error)
  // })
}

export default function reducer(state = init(), action) {
  switch (action.type) {
    case GET_SERVER_CONFIG.SUCCESS: {
      const oldState = JSON.parse(JSON.stringify(state))
      const newState = Object.assign(oldState, {
        serverConfig: action.data
      })
      return newState
    }
    default: return state
  }
}