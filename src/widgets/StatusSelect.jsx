import React, { Component, useEffect, useState, forwardRef } from 'react'
import ReactDOM from 'react-dom'
import { Select } from 'antd'

const { Option } = Select

/**
 * antd select option not support boolean value, so we should do converation in this component.-_-
 */
export default forwardRef(({ 
  onChange = () => {},
  value = null,
  placeholder = '请选择',
  statusList = [],
  valueKey = 'value',
  labelKey = 'label'
}, ref) => {
  return (
    <Select allowClear ref={ref} style={{ width: 150 }} defaultValue={value === null ? value : `${value}`} onChange={(value) => onChange(value === undefined ? value : JSON.parse(value))} placeholder={placeholder}>
      {
        statusList.map((ele, index) => {
          return (
            <Option key={ele[valueKey]}>{ele[labelKey]}</Option>
          )
        })
      }
    </Select>
  )
})