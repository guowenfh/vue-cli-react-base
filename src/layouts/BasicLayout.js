import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'

class BasicLayout extends Component {
  render() {
    const { route } = this.props
    return (
      <div>
        {/* child routes won't render without this */}
        {renderRoutes(route.routes)}
      </div>
    )
  }
}

export default BasicLayout
