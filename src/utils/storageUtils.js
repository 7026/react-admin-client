import store from 'store'
/**
 *local数据存储模块
 */

const USER_KEY = 'user_key'
export default {
  /**
   * 保存数据
   */
  saveUser(user) {
    store.set(USER_KEY, user)
    // localStorage.setItem(USER_KEY, JSON.stringify(user))
  },
  /**
   * 获取数据
   */
  getUser() {
    return store.get(USER_KEY) || {}
    // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
  },
  /**
   * 移除数据
   */
  removeUser() {
    store.remove(USER_KEY)
    // localStorage.removeItem(USER_KEY)
  }
}
