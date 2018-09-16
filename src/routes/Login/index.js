import React, { Component } from 'react'
import { Row, Col } from 'antd'
import main from 'static/main.png'
import style from './style.module.css'
import LoginForm from './LoginForm'

class Login extends Component {
  render() {
    return (
      <div className={`${style.login}`}>
        <Row type="flex" justify="center">
          <Col span={24} className={style.align}>
            <img src={main} style={{ width: '20%' }} />
            <h1>使用antd + react-router</h1>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={4}>
            <LoginForm history={this.props.history} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Login
