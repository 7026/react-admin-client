/**
 * 发送ajax请求
 */
import Axios from 'axios'
import { message } from 'antd'
export default function ajax(url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let prommise
    if (type === 'GET') {
      prommise = Axios.get(url, {
        params: data
      })
    } else {
      prommise = Axios.post(url, data)
    }
    prommise
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        message.error(`请求出错：${error.message}`)
      })
  })
}
