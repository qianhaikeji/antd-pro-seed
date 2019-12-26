import { Form, Input, Modal } from 'antd';
import React, {useState, useEffect} from 'react'
import funcfy from './funcfyDialog'
import _ from 'lodash'

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  }
}

const UpdateForm = ({
  title,
  autoClose = true,
  form,
  items = [],
  onSubmit = () => {},
  onDestory
}) => {
  const [visible, setVisible] = useState(true)

  const close = () => {
    setVisible(false)
    onDestory()
  }

  const okHandle = () => {
    form.validateFields(async (err, fieldsValue) => {
      if (err) return
      form.resetFields()

      try {
        await onSubmit(fieldsValue)
        if (autoClose) {
          close()
        }
      } catch (err) {
        console.log(err)
      }
    });
  };

  return (
    <Modal
      destroyOnClose
      title={title}
      visible={visible}
      onOk={okHandle}
      onCancel={close}
      okText='确认'
      cancelText='取消'
      maskClosable={false}
    >
      {
        items.map((item, index) => {
          return (
            <FormItem {...formItemLayout} label={item.label} key={index}>
              {
                form.getFieldDecorator(
                  item.field, 
                  item.options
                )(item.component)
              }
            </FormItem>
          )
        })
      }
    </Modal>
  );
};

export default (props) => funcfy(Form.create()(UpdateForm), props)
