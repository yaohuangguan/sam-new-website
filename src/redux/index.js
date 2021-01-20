
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'

// 引入redux模块
import systemRedux from './systemRedux'
import userRedux from './userRedux'

export * from './systemRedux'
export * from './userRedux'

// 创建数据仓库
export const store = createStore(combineReducers({
  systemRedux,
  userRedux,
}), window.__REDUX_DEVTOOLS_EXTENSION__ ?
  // compose(applyMiddleware(logger), window.__REDUX_DEVTOOLS_EXTENSION__())
  compose(window.__REDUX_DEVTOOLS_EXTENSION__())
  :
  applyMiddleware(logger)
)