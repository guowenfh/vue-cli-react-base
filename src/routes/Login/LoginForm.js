import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import style from './style.module.css'
import md5 from 'js-md5'
import { userLogin, getUserInfo } from 'common/api'
const FormItem = Form.Item
class NormalLoginForm extends Component {
  state = {
    loading: false
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        return console.log('Received values of form: ', values)
      }
      const params = {
        userName: values.userName,
        password: md5(values.password)
      }
      this.setState({ loading: true })
      userLogin(params)
        .then(data => {
          if (data.success) {
            return data
          }
          return Promise.reject('登录失败')
        })
        .then(() => {
          this.setState({ loading: false })
          this.props.history.push('/index/PictureDetails')
        })
        .catch(err => {
          this.setState({ loading: false })
        })
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { loading } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' }]
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }]
          })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className={style['login-form-button']} disabled={loading}>
            登录
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)
export default WrappedNormalLoginForm
