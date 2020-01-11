import React, { Component } from 'react'
import './login.less'
import logo from '../../assets/images/logo.png'

import { Form, Icon, Input, Button, message } from 'antd'
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom'
/**
 * 登录
 * 路由组建
 */
class Login extends Component {
  handleSubmit = event => {
    // 阻止默认事件
    event.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      // 校验成功
      if (!err) {
        const { username, password } = values // { username, password }与 {getFieldDecorator('password', {  这种要一至
        const result = await reqLogin(username, password)
        if (result.status === 0) {
          message.success('登陆成功')
          const user = result.data
          memoryUtils.user = user // 保存在内存中
          storageUtils.saveUser(user) // 保存到localstorage
          this.props.history.replace('/')
        } else {
          message.error(result.msg)
        }
      } else {
        console.log(err)
      }
    })
  }
  validatePwd = (rule, value, callback) => {
    if (!value) {
      callback('密码不能为空！')
    } else if (value.length < 4) {
      callback('密码长度必须大于4位')
    } else if (value.length > 12) {
      callback('密码长度必须小于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必许是英文、数字或下划线组成')
    } else {
      callback()
    }
  }

  render() {
    // 判断用户是否登录 如果已经登录跳转到管理界面
    const user = memoryUtils.user
    if (user && user._id) {
      return <Redirect to='/' />
    }
    const form = this.props.form
    const { getFieldDecorator } = form
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt='' />
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className='login-content'>
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className='login-form'>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, whitespace: true, message: '请输入用户名' },
                  { min: 4, message: '最少4位' },
                  { max: 12, message: '最多12位' },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: '用户名必许是英文、数字或下划线组成'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder='Username'
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ validator: this.validatePwd }]
              })(
                <Input
                  prefix={
                    <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type='password'
                  placeholder='Password'
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
              >
                登陆
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

const WrapLogin = Form.create()(Login)

export default WrapLogin
