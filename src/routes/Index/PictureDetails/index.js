import React, { Component } from 'react'
import { getTrade } from '@/common/api.js'
export default class ImageDetails extends Component {
  state = {
    data: {}
  }
  async componentDidMount() {
    const data = await getTrade()
    this.setState({ data })
  }

  render() {
    const { data } = this.state
    return (
      <div>
        ImageDetails <div>{JSON.stringify(data, null, 4)}</div>
      </div>
    )
  }
}
