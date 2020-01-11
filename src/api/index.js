import ajax from './ajax'

/**
 * 包含应用中所有请求接口的函数
 * reqLogin 登录
 */
// 登录
export const reqLogin = (username, password) =>
  ajax('/login', { username, password }, 'POST')

// 添加用户

export const reqAddUser = user => ajax('/manage/user/add', user, 'POST')
