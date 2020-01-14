import React, { Component } from 'react'
import './index.less'
import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.png'
import { Link, withRouter } from 'react-router-dom'

import { Menu, Icon } from 'antd'

const { SubMenu } = Menu

/**
 * 组件
 * 左侧导航菜单
 */
class LeftNav extends Component {
  /*
   *根据menu的数组生成对应的标签数组
   * map + 递归调用  
   * 如果有children   
   {this.getMenuNodes(item.children)}
   * 
   *
   * 
   */
  getMenuNodes_map = menuList => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {/* 递归调用 */}
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }
  /*
   *根据menu的数组生成对应的标签数组
   * reduce + 递归调用  
   * 如果有children   
   {this.getMenuNodes(item.children)}
   * 
   *
   * 
   */
  getMenuNodes = menuList => {
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        const path = this.props.location.pathname
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          this.openKey = item.key
        }
        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {/* 递归调用 */}
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
      return pre
    }, []) // 【】为 pre 默认值
  }
  // 只执行一次
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {
    // 获取 当前路径
    const path = this.props.location.pathname
    const openKey = this.openKey
    return (
      <div className='left-nav'>
        <Link to='/' className='left-nav-header'>
          <img src={logo} alt='logo' />
          <h1>React后台管理</h1>
        </Link>
        <Menu
          mode='inline'
          theme='dark'
          defaultOpenKeys={[openKey]}
          selectedKeys={[path]}
        >
          {this.menuNodes}
        </Menu>
      </div>
    )
  }
}

/**
 * 
// withRouter 高阶组件   是个函数
 * 包装非路由组件  返回一个新的函数
 新的组件向非路由组件传递3个属性  history/location/match
 */
export default withRouter(LeftNav)
