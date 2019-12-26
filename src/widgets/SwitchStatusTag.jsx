import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {ENUM_SWITCH_STATUS} from '@/enum'
import StatusTag from '@/components/StatusTag'

export default ({ 
  status,
}) => {
  return <StatusTag status={status} statusEnum={ENUM_SWITCH_STATUS} />
}