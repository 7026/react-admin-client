import React, { Component } from 'react'
import './login.less'
import logo from './images/logo.png'

import { Form, Icon, Input, Button } from 'antd'
/**
 * 登录
 * 路由组建
 */
class Login extends Component {
  handleSubmit = event => {
    // 阻止默认事件
    event.preventDefault()
    this.props.form.validateFields((err, values) => {
      // 校验成功
      if (!err) {
        console.log(values)
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
              {getFieldDecorator('Password', {
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
                登录
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
