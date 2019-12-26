import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Tag} from 'antd'

export default ({ 
  status,
  statusEnum,
}) => {
  return statusEnum 
    ? <Tag>{statusEnum.toText(status)}</Tag>
    : null
}