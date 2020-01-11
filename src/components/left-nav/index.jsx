import React, { Component } from 'react'
import './index.less'
import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'

import { Menu, Icon } from 'antd'

const { SubMenu } = Menu

/**
 * 组件
 * 左侧导航菜单
 */
export default class LeftNav extends Component {
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
    }, [])
  }

  render() {
    return (
      <div className='left-nav'>
        <Link to='/' className='left-nav-header'>
          <img src={logo} alt='logo' />
          <h1>React后台管理</h1>
        </Link>
        <Menu mode='inline' theme='dark' defaultSelectedKeys={['/home']}>
          {this.getMenuNodes(menuList)}
        </Menu>
      </div>
    )
  }
}
