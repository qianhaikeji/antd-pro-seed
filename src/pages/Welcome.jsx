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

const Widget = ({
  currentUser,
  userType,
}) => {
  return (
    <PageHeaderWrapper>
      <Card>
        统计页面
      </Card>
    </PageHeaderWrapper>
  )
}


const mapState = ({ user, loading }) => ({
  currentUser: user.currentUser,
  userType: user.userType
})

const mapDispatch = (dispatch) => ({
})

export default connect(mapState, mapDispatch)(Widget)