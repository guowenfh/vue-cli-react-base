import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import logo from './logo.png'
import styles from './App.module.css'

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <header className={styles.appHeader}>
          <img src={logo} className={styles.appLogo} alt="logo" />
          <h1 className={styles.appTitle}>Welcome to React</h1>
        </header>
        <p className={styles.appIntro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default hot(module)(App)
// export default App
