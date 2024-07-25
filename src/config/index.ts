import { IAnyObject } from '../types'

interface IConfig {
  [propName: string]: IAnyObject
}

// 这里是后台接口前缀
export const config: IConfig = {
  development: {
    default: '/',
    localhost: '/',
    hjcLocalhost: '/',
    wjLocalhost: '/'
  },
  production: {
    default: '/',
    localhost: '/',
    hjcLocalhost: '/',
    wjLocalhost: '/'
  }
}
