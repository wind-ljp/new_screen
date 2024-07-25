/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-03-15 11:48:02
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-12-28 13:46:50
 */
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import localForage from 'localforage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

const middleware: any[] = [thunk];

// 判断是否是正式环境
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const persistConfig = {
  key: 'BASE_ROOT',
  storage: localForage, // 使用 localforage 进行存储
  whitelist: [
    'counter',
    'dictionary',
    'authorization',
    'largeScreen',
    'userinfo'
  ]
};

const persistedReducer = persistReducer(persistConfig, reducers);

// 创建 Redux store
const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

export { store, persistor };