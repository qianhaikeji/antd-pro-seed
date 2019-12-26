import { getPlatformProfile, getChannelProfile } from '@/services/api/auth';
import { getAdminList } from '@/services/api/admin';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    userType: null
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getAdminList);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put, select }) {
      const userType = yield select((state) => state['user'].userType)
      const profileFunc = userType === 'platform' ? getPlatformProfile : getChannelProfile
      try {
        const response = yield call(profileFunc);
        yield put({
          type: 'saveCurrentUser',
          payload: response,
        });
      } catch (err) {
        console.log(err)
      }
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    saveUserType(state, action) {
      return { ...state, userType: action.payload };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
