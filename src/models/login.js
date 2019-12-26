import { routerRedux } from 'dva/router';
import { stringify } from 'querystring';
import { platformLogin, channelLogin,} from '@/services/api/auth';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    token: null,
    logined: false,
    profile: {},
    userType: null
  },
  effects: {
    *login({ payload }, { call, put }) {
      const loginFunc = payload.type === 'platform' ? platformLogin : channelLogin
      const rootUrl = payload.type === 'platform' ? '/platform' : '/channel'
      yield put({
        type: 'user/saveUserType',
        payload: payload.type,
      }); //

      try {
        const response = yield call(loginFunc, payload);
        console.log(response);
        yield put({
          type: 'changeLoginStatus',
          payload: {...response, currentAuthority: payload.type},
        }); // Login successfully
  
        if (response) {
          yield put({
            type: 'user/saveCurrentUser',
            payload: response.profile,
          }); //
  
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();
          // let { redirect } = params;
          // console.log(redirect);
  
          // if (redirect) {
          //   const redirectUrlParams = new URL(redirect);
  
          //   if (redirectUrlParams.origin === urlParams.origin) {
          //     redirect = redirect.substr(urlParams.origin.length);
  
          //     if (redirect.match(/^\/.*#/)) {
          //       redirect = redirect.substr(redirect.indexOf('#') + 1);
          //     }
          //   } else {
          //     window.location.href = '/';
          //     return;
          //   }
          // }
  
          // yield put(routerRedux.replace(redirect || '/'));
          // 重定向时，可能会使channel用户访问到admin用户才能访问的页面，所以先禁用该功能
          yield put(routerRedux.replace('/'));
        }
      } catch (err) {
        console.log(err)
      }
    },

    *getCaptcha({ payload }, { call }) {
      // yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      const { redirect } = getPageQuery(); // redirect

      yield put({
        type: 'clear',
      });

      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        token: payload.token,
        logined: true,
      };
    },
    clear(state) {
      return {
        status: undefined,
        token: null,
        logined: false,
      };
    },
  },
};
export default Model;
