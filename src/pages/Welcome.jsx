import React from 'react';
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
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva'
import moment from 'moment'
import editForm from '@/components/Dialog/EditForm'
import ChannelOwnExchangeTable from '@/widgets/ChannelOwnExchangeTable'
import {ENUM_SWITCH_STATUS} from '@/enum'
import { 
  changeChannelPassword, 
}  from '@/services/api/auth'

const ChannelProfile = ({ 
  profile = {} 
}) => {
  return (
    <div>
      <div>渠道简介：{profile.desc}</div>
      <div>渠道链接：{profile.channelLink}</div>
      <div>联系人：{profile.contact}</div>
      <div>联系人电话：{profile.phone}</div>
      <div>联系人邮箱：{profile.email}</div>
      <div>账户地址：{profile.walletAddr}</div>
      <div>默认佣金率比例：{profile.commissionRatio}</div>
      <div>状态：{profile.closed ? '已关闭' : '已启用'}</div>
    </div>
  )
};

const Widget = ({
  currentUser,
  userType,
}) => {
  if (userType === 'channel') {
    return (
      <PageHeaderWrapper 
        title={`渠道：${currentUser.username}`}
        content={<ChannelProfile profile={currentUser}></ChannelProfile>}
        extraContent={
          <Button style={ {marginRight: '10px'} } type="primary" onClick={() => {
            editForm({
              title: '修改密码', 
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
              onSubmit: async (data) => {
                try {
                  await changeChannelPassword(data)
                  notification.success({
                    message: `密码修改成功!`,
                  });
                } catch (err) {
                  console.log(err)
                }
              },
            })
          }}>
          修改密码
        </Button>
        
        }
      >
        <Card
          title="渠道所属交易对列表"
        >
          <ChannelOwnExchangeTable></ChannelOwnExchangeTable>
        </Card>
      </PageHeaderWrapper>
    )
  } else if (userType === 'platform') {
    return (
      <PageHeaderWrapper>
        <Card>
          统计页面
        </Card>
      </PageHeaderWrapper>
    )
  } else {
    return null
  }
}


const mapState = ({ user, loading }) => ({
  currentUser: user.currentUser,
  userType: user.userType
})

const mapDispatch = (dispatch) => ({
})

export default connect(mapState, mapDispatch)(Widget)