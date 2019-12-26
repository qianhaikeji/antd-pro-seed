import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { DatePicker } from 'antd'
import moment from 'moment'

const { RangePicker } = DatePicker

function convertDateRangeForQuery (dates) {
  const start = moment(dates[0]).startOf('d')
  const end = moment(dates[1]).add(1, 'days').startOf('d')
  return [new Date(start), new Date(end)]
}

export default ({ 
  onChange
}) => {
  return <RangePicker placeholder="选择范围" format='YYYY-MM-DD' onChange={(data) => {
    const dates = convertDateRangeForQuery(data)
    onChange(dates)
  }} />
}