import React, { Component } from 'react'
import './index.less'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import { withRouter } from 'react-router-dom'
import menuList from '../../config/menuConfig'
/**
 * Header 头部导航组件
 */
class Header extends Component {
  state = {
    currentTime: formateDate(Date.now())
  }
  getTime = () => {
    //每隔一秒 获取当前时间 ， 并更新状态数据
    setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({ currentTime })
    }, 1000)
  }
  getTitle = () => {
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        const cItem = item.children.find(citem => citem.key === path)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }
  componentDidMount() {
    this.getTime()
  }
  render() {
    const { currentTime } = this.state
    const userName = memoryUtils.user.username
    const title = this.getTitle()
    return (
      <div className='header'>
        <div className='header-top'>
          <span>欢迎，{userName} </span>
          <a href='/'>退出</a>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'> {title} </div>
          <div className='header-bottom-right'>
            <span> {currentTime} </span>
            <img
              src='http://src.leju.com/imp/imp/deal/7c/83/e/7d81c041cda10eb96791da18f0b_p24_mk24_sx0.png'
              alt='weather'
            />
            <span>多云转晴</span>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)
