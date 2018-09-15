import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { LocaleProvider, notification } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import Router from './router'

notification.config({
  duration: 2,
})

ReactDOM.render(
  <LocaleProvider locale={zh_CN}>
    <Router />
  </LocaleProvider>,
  document.getElementById('app')
)
