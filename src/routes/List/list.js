import React, { Component } from 'react'

export default class List extends Component {
  render() {
    return (
      <div>
        <ul>
          {Array(10).map((_,i=>(
            <li>{i}</li>
          )))}
        </ul>
      </div>
    )
  }
}
