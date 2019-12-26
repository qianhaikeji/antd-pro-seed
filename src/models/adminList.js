import { 
  getAdminList,createAdmin, modifyAdmin, deleteAdmin, changeAdminPassword
}  from '@/services/api/admin'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'adminList',
  getListMethod: getAdminList,
  createMethod: createAdmin,
  deleteMethod: deleteAdmin,
  modifyMethod: modifyAdmin,
})

const Model = {
  effects: {
    *changePassword({ payload }, { call, put, select }) {
      try {
        yield call(changeAdminPassword, payload.id, payload.data)
      } catch (err) {
        console.log(err)
      }
    },
  }
}
export default _.merge(baseModel, Model)