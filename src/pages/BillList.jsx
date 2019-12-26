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
} from 'antd'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import React, { userEffect, useState, Fragment, useEffect } from 'react'
import { connect } from 'dva'
import moment from 'moment'
import excel from '@/services/excel'
import {downloadAllPage, convertDateRangeForQuery} from '@/utils/utils'
import TableList from '@/components/TableList'
import editForm from '@/components/Dialog/EditForm'
import QueryForm from '@/components/QueryForm'
import toast from '@/components/Toast'
import ChannelSelect from '@/widgets/ChannelSelect'
import { 
  getBillList, 
}  from '@/services/api/bill'

const {Text} = Typography
const FormItem = Form.Item
const { Option } = Select
const { confirm } = Modal
const { RangePicker } = DatePicker

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
    title: '交易单编号',
    dataIndex: 'hash',
    width: 150,
    ellipsis: true
  },{
    title: '钱包地址',
    dataIndex: 'walletAddr',
    width: 150,
    ellipsis: true
  },{
    title: '交易类型',
    dataIndex: 'side',
    render: (text, record) => text === 1 ? '买单' : '卖单'
  },{
    title: '价格',
    dataIndex: 'price',
  },{
    title: 'size/filledSize',
    dataIndex: 'size',
    render: (text, record) => record.filledSize === 0 ? 0 : (record.size / record.filledSize).toFixed(2)
  },{
    title: 'volume/filledVolume',
    dataIndex: 'volume',
    render: (text, record) => record.filledVolume === 0 ? 0 : (record.volume / record.filledVolume).toFixed(2)
  },{
    title: '渠道',
    dataIndex: 'channelName',
  },{
    title: '上级渠道',
    dataIndex: 'parentChannelName',
  },{
    title: '总手续费',
    dataIndex: 'totalMoney',
  },{
    title: '渠道所得',
    dataIndex: 'channelMoney',
  },{
    title: '上级渠道所得',
    dataIndex: 'parentChannelMoney',
  },{
    title: '交易状态',
    dataIndex: 'status',
  },{
    title: '交易时间',
    dataIndex: 'settlementAt',
    render: (text, record) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    width: 150,
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
  {
    label: '渠道',
    field: 'channelId',
    component: <ChannelSelect />,
  },
  {
    label: '交易时间',
    field: 'settlementAt',
    component: <RangePicker placeholder="选择范围" format='YYYY-MM-DD' />
  }
]

const Widget = ({
  loading,
  list,
  pagination,
  loadList,
  deleteItem,
  modifyItem,
  createItem
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
    if (params.settlementAt && params.settlementAt.length === 2) {
      const dates = convertDateRangeForQuery(params.settlementAt)
      params.startDate = dates[0]
      params.endDate = dates[1]
    }

    delete params.settlementAt

    setQueryParams(params)
    const cond = {
      page: 1,
      pageSize: pagination.pageSize,
      ...params,
    }

    loadList(cond)
  }

  const onExport = async (params) => {
    if (params.settlementAt && params.settlementAt.length === 2) {
      const dates = convertDateRangeForQuery(params.settlementAt)
      params.startDate = dates[0]
      params.endDate = dates[1]
    }

    delete params.settlementAt

    toast.show({message: '正在导出数据...'})
    try {
      const allData = await downloadAllPage(getBillList, params)
      excel.exportJsonToXlsx('交易记录', _.map(allData, ele => {
        return {
          '交易单编号': ele.hash,
          '钱包地址': ele.walletAddr,
          '交易类型': ele.side === 1 ? '买单' : '卖单',
          '交易时间': moment(ele.settlementAt).format('YYYY-MM-DD HH:mm:ss'),
          '价格': ele.price,
          'base总量': ele.size,
          'quto': ele.volume,
          'base已成交量': ele.filledSize,
          'quto已成交量': ele.filledVolume,
          '渠道': ele.channelName,
          '上级渠道': ele.parentChannelName,
          '总手续费': ele.totalMoney,
          '渠道所得': ele.channelMoney,
          '上级渠道所得': ele.parentChannelMoney,
        }
      }))
    } catch (err) {
      console.log(err)
      notification.error({
        message: `导出excel失败`,
        description: err.message,
      })
    }
    toast.hide()
  }
  

  const opColums = [
    
  ]

  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <QueryForm items={queryFormItems} onSubmit={onQuery} exportable onExport={onExport}></QueryForm>
        <div style={ {marginBottom: 10} }>
          
          
          
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

const mapState = ({ billList, loading }) => ({
  list: billList.list,
  pagination: billList.pagination,
  loading: loading.models.billList,
})

const mapDispatch = (dispatch) => ({
  loadList: (payload) => dispatch({
    type: 'billList/fetch',
    payload
  }),
  
  
  
})

export default connect(mapState, mapDispatch)(Widget)