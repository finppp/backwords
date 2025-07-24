import React, { Component } from 'react'
import styles from './Header.module.scss'

export class Header extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h1>Voice Reverser</h1>
      </div>
    )
  }
}

export default Header
