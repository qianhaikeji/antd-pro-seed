import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Menu,
  Row,
  Select,
  message,
} from 'antd';
import React, {useState, useEffect} from 'react'
import _ from 'lodash'

const FormItem = Form.Item

const Widget = ({
  form,
  items,
  simpleFieldCount = 3,
  exportable = false,
  onSubmit = () => {},
  onExport = () => {}
}) => {
  const [expandForm, setExpandForm] = useState(false)
  const { getFieldDecorator } = form

  const onClickExport = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return
      const values = _.pickBy(fieldsValue, (value, key) => {
        return value !== null && value !== '' && value !== undefined
      })
      console.log(values)
      onExport(values)
    });
  }

  return (
    <Form onSubmit={(e) => {
      e.preventDefault()
      form.validateFields((err, fieldsValue) => {
        if (err) return
        const values = _.pickBy(fieldsValue, (value, key) => {
          return value !== null && value !== '' && value !== undefined
        })
        onSubmit(values)
      });
      
    }} layout="inline">
      <Row
        gutter={{
          md: 8,
          lg: 24,
          xl: 48,
        }}
      >
        {
          _.chain(items).take(expandForm ? items.length : simpleFieldCount).map((item, index) => {
            return (
              <Col md={8} sm={24} key={index}>
                <FormItem label={item.label}>
                  {getFieldDecorator(item.field)(item.component)}
                </FormItem>
              </Col>
            )
          }).value()
        }
      </Row>
      <div style={{overflow: 'hidden',}}>
        <div style={{marginTop: 12, marginBottom: 24,}}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          {
            exportable && 
            <Button style={ {marginLeft: '10px'} } icon="export" type="primary" onClick={() => onClickExport()}>
              导出Excel
            </Button>
          }
          {
            // items.length > 0 &&
            // <Button style={{marginLeft: 8,}} onClick={() => form.resetFields()}>
            //   重置
            // </Button>
          }
          {
            items.length > simpleFieldCount &&
            <a style={{marginLeft: 8,}} onClick={() => setExpandForm(!expandForm)}>
              { expandForm ? <>收起 <Icon type="up" /></> : <>展开 <Icon type="down" /></> }
            </a>
          }
        </div>
      </div>
    </Form>
  )
}


export default Form.create()(Widget)