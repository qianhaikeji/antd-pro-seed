import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Spin} from 'antd'
import styles from './index.less'

const Widget = ({ 
  message
}) => {
  return (
    <div className={styles.savingSpin}>
      <Spin />
      {message}
    </div>
  )
}

let div = null
const show = (props) => {
  div = document.createElement('div')
  document.body.appendChild(div)

  const dom = ReactDOM.render(
    <Widget {...props}>
    </Widget>
  , div)
}

const hide = () => {
  ReactDOM.unmountComponentAtNode(div)
  document.body.removeChild(div)
}

export default {
  show,
  hide
}