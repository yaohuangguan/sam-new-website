
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'

// 引入redux模块
import settings from './settings'

export * from './settings'

// 创建数据仓库
export const store = createStore(combineReducers({
  settings,
}), window.__REDUX_DEVTOOLS_EXTENSION__ ?
  // compose(applyMiddleware(logger), window.__REDUX_DEVTOOLS_EXTENSION__())
  compose(window.__REDUX_DEVTOOLS_EXTENSION__())
  :
  applyMiddleware(logger)
)