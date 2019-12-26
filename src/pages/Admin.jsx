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
  Typography,
  Alert,
  Modal,
  notification,
  Switch
} from 'antd'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import React, { userEffect, useState, Fragment, useEffect } from 'react'
import { connect } from 'dva'
import moment from 'moment'
import excel from '@/services/excel'
import {downloadAllPage} from '@/utils/utils'
import TableList from '@/components/TableList'
import editForm from '@/components/Dialog/EditForm'
import QueryForm from '@/components/QueryForm'
import toast from '@/components/Toast'
import SwitchStatusTag from '@/widgets/SwitchStatusTag'
import {ENUM_SWITCH_STATUS} from '@/enum'
import StatusSelect from '@/widgets/StatusSelect'

const {Text} = Typography
const FormItem = Form.Item
const { Option } = Select
const { confirm } = Modal

/**
 * columns 此处写入列数据
{
  title: '项目名',
  dataIndex: 'name',
  sorter: true,
},
*/
const columns = [
  {
    title: '账号',
    dataIndex: 'username',
  },{
    title: '昵称',
    dataIndex: 'nickname',
  }
];

/**
 * queryFormItems 此处设计查询条件form
  {
    label: '模糊搜索',
    field: 'fuzzy',
    component: <Input placeholder="请输入" />
  }
*/
const queryFormItems = [
]

/**
 * createFormItems 此处设计新建窗口属性
  {
    label: '项目名称',
    field: 'name',
    component: <Input placeholder="请输入" />,
    options: {
      rules: [
        {
          required: true,
          message: '请输入至少五个字符的规则描述！',
          min: 5,
        }
      ],
    }
  }
*/
const createFormItems = [
  {
    label: '账号',
    field: 'username',
    component: <Input placeholder="请输入" />,
    options: {
      rules: [
        {
          required: true,
        }
      ],
    }
  },{
    label: '密码',
    field: 'password',
    component: <Input placeholder="请输入" />,
    options: {
      rules: [
        {
          required: true,
        }
      ],
    }
  },{
    label: '昵称',
    field: 'nickname',
    component: <Input placeholder="请输入" />,
    options: {
      rules: [
        {
          required: false,
        }
      ],
    }
  }
]

/**
 * updateFormItems 此处设计编辑窗口属性
  {
    label: '项目名称',
    field: 'name',
    component: <Input placeholder="请输入" />,
    options: {
      rules: [
        {
          required: true,
          message: '请输入至少五个字符的规则描述！',
          min: 5,
        }
      ],
    }
  }
*/
const updateFormItems = [
  {
    label: '昵称',
    field: 'nickname',
    component: <Input placeholder="请输入" />,
    options: {
      rules: [
        {
          required: true,
        }
      ],
    }
  }
]

const Widget = ({
  loading,
  list,
  pagination,
  loadList,
  deleteItem,
  modifyItem,
  createItem,
  changePassword
}) => {
  const [queryParams, setQueryParams] = useState({})
  

  useEffect(() => {
    loadList({
      page: pagination.current,
      pageSize: pagination.pageSize,
    })
  }, [])

  const handleTableChange = (pagination, filters, sorter) => {
    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...queryParams,
      ...filters,
      ...sorter
    }

    loadList(params)
  }

  const onQuery = (params) => {
    setQueryParams(params)
    const cond = {
      page: 1,
      pageSize: pagination.pageSize,
      ...params,
    }

    loadList(cond)
  }

  const opColums = [
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => {
            editForm({
              title: '编辑管理员', 
              items: _.map(updateFormItems, ele => {
                if (record[ele.field] !== undefined) {
                  ele.options.initialValue = record[ele.field]
                }
                return ele
              }),
              onSubmit: (data) => {
                modifyItem(record.id, data)
              },
            })
          }}>编辑</a>
          <a style={ {marginLeft: '15px'} }  onClick={() => {
            editForm({
              title: '重置密码', 
              items: [{
                label: '新密码',
                field: 'password',
                component: <Input placeholder="请输入" />,
                options: {
                  rules: [
                    {
                      required: true,
                    }
                  ],
                }
              }],
              onSubmit: (data) => {
                changePassword(record.id, data)
              },
            })
          }}>重置密码</a>
          <a style={ {marginLeft: '15px'} } onClick={ () => {
            confirm({
              title: '确定删除此纪录吗？',
              content: '删除后不可恢复',
              okText: '删除',
              okType: 'danger',
              cancelText: '取消',
              onOk: async() => {
                deleteItem(record.id)
              },             
            })
          } }>删除</a>
        </Fragment>
      ),
    },
  ]

  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <QueryForm items={queryFormItems} onSubmit={onQuery}></QueryForm>
        <div style={ {marginBottom: 10} }>
          <Button style={ {marginRight: '10px'} } icon="plus" type="primary" onClick={() => editForm({
              title: '新建管理员', 
              items: createFormItems,
              onSubmit: (data) => createItem(data),
            })}>
            新建
          </Button>
          
          
        </div>
        <TableList
          
          loading={loading}
          data={ {list, pagination} }
          columns={[...columns, ...opColums]}
          onChange={handleTableChange}
        />
      </Card>
    </PageHeaderWrapper>
  )
}

const mapState = ({ adminList, loading }) => ({
  list: adminList.list,
  pagination: adminList.pagination,
  loading: loading.models.adminList,
})

const mapDispatch = (dispatch) => ({
  loadList: (payload) => dispatch({
    type: 'adminList/fetch',
    payload
  }),
  deleteItem: (id) => dispatch({
    type: 'adminList/deleteItem',
    payload: {id}
  }),
  createItem: (data) => dispatch({
    type: 'adminList/createItem',
    payload: {data}
  }),
  modifyItem: (id, data) => dispatch({
    type: 'adminList/modifyItem',
    payload: {id, data}
  }),
  changePassword: (id, data) => dispatch({
    type: 'adminList/changePassword',
    payload: {id, data}
  }),
})

export default connect(mapState, mapDispatch)(Widget)