import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';
import moment from 'moment'
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(({ path }) => path && pathRegexp(path).exec(pathname));
  if (authority) return authority;
  return undefined;
};

export const getStoreState = () => {
  return window.g_app._store.getState();
};

export const getStoreDispatch = () => {
  return window.g_app._store.dispatch;
};

export async function downloadAllPage (getPage, conds) {
  let allData = []
  let pageParams = {
    page: 1,
    pageSize: 500
  }

  let hasMore = true
  while (hasMore) {
    let res = await getPage(Object.assign({}, conds, pageParams))
    allData = allData.concat(res.rows)
    hasMore = res.rows.length === pageParams.pageSize
    pageParams.page ++
  }
  return allData
}

export function convertDateRangeForQuery (dates) {
  const start = moment(dates[0]).startOf('d')
  const end = moment(dates[1]).add(1, 'days').startOf('d')
  return [new Date(start), new Date(end)]
}
