import React, { Component } from 'react'
import memoryUntils from '../../utils/memoryUtils'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

import Home from '../home/home'
import User from '../user/user'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

/**
 * 管理的路由组件
 */
const { Sider, Content, Footer } = Layout
export default class Admin extends Component {
  render() {
    const user = memoryUntils.user
    if (!user || !user._id) {
      return <Redirect to='/login' />
    }
    return (
      <div>
        <Layout style={{ height: '100vh' }}>
          <Sider>
            <LeftNav />
          </Sider>
          <Layout>
            <Header>Header</Header>
            <Content style={{ margin: '20px', backgroundColor: '#fff' }}>
              <Switch>
                <Route path='/home' component={Home} />
                <Route path='/category' component={Category} />
                <Route path='/product' component={Product} />
                <Route path='/role' component={Role} />
                <Route path='/user' component={User} />
                <Route path='/charts/bar' component={Bar} />
                <Route path='/charts/line' component={Line} />
                <Route path='/charts/pie' component={Pie} />
                <Redirect to='/home' />
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center', color: '#ccc' }}>
              使用谷歌浏览器食用更好
            </Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}
