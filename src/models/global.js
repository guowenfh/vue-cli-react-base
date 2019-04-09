export default {
  state: {
    query: {} // 全局一些属性，比如 location.search 拿到的值
  },
  reducers: {
    setQuery(state, payload) {
      state.query = payload
      return state
    }
  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload = 1, rootState = {}) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.incrementcount(payload)
    }
  }
}

// import { connect } from 'react-redux'
// const mapStateToProps = state => {
//     console.error(state)
//     return {
//         count: state.global.count
//     }
// }
// const mapDispatchToProps = dispatch => ({
//     incrementAsync: dispatch.global.incrementAsync
// })

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Component)
