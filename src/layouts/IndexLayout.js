import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import { Layout, Menu, Icon } from 'antd'
import style from './style.module.css'
const { SubMenu } = Menu
const { Content, Sider } = Layout
class Admin extends Component {
  state = {}
  componentDidMount() {}
  onMenuClick = e => {
    const { location, history } = this.props
    if (location.pathname === e.key) {
      return
    }
    history.push(e.key)
  }
  componentWillMount() {}
  render() {
    const { location } = this.props
    const { route } = this.props
    return (
      <Layout>
        <Layout className={style.contents}>
          <Sider width={170} style={{ background: '#fff' }}>
            <Menu
              onClick={this.onMenuClick}
              mode="inline"
              selectedKeys={[location.pathname]}
              style={{ height: '100%', borderRight: 0 }}>
              {route.routes.map(item => {
                if (typeof item.isMenu === 'boolean' && item.isMenu === false) {
                  return null
                }
                //  看这个有没有子类  有child就显示
                if (item.children) {
                  return (
                    <SubMenu
                      key={item.path}
                      title={
                        <span>
                          <Icon type={item.icon} />
                          {item.name}
                        </span>
                      }>
                      {item.children.map(child => {
                        return (
                          <Menu.Item key={child.path} style={{ height: 40, display: 'block' }}>
                            <span>
                              <Icon type={child.icon} style={{ float: 'left', marginTop: 13 }} />
                              <div
                                style={{
                                  height: 40,
                                  float: 'left',
                                  wordBreak: 'break-all',
                                  wordWrap: 'break-word',
                                  whiteSpace: 'normal',
                                  lineHeight: '20px',
                                  marginTop: 10
                                }}>
                                {child.name}
                              </div>
                            </span>
                          </Menu.Item>
                        )
                      })}
                    </SubMenu>
                  )
                }
                return (
                  <Menu.Item key={item.path} style={{ height: 40, display: 'block' }}>
                    <span style={{ height: 40, display: 'block' }}>
                      <Icon type={item.icon} style={{ float: 'left', marginTop: 13 }} />
                      <div
                        style={{
                          height: 40,
                          float: 'left',
                          wordBreak: 'break-all',
                          wordWrap: 'break-word',
                          whiteSpace: 'normal',
                          lineHeight: '20px',
                          marginTop: 10
                        }}>
                        {item.name}
                      </div>
                    </span>
                  </Menu.Item>
                )
              })}
            </Menu>
          </Sider>
          <Layout style={{ padding: 0, borderLeft: 'solid 1px #e8e8e8' }}>
            <Content style={{ background: '#fff', padding: 12, margin: 0, minHeight: 280 }}>
              {renderRoutes(route.routes)}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Admin
