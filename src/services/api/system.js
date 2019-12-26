import request from '@/utils/request';
export async function getSystemVersion(params) {
  return request(`/api/platform/system/version`, {
    method: 'get',
    params: params,
  });
}

export async function setCommissionRule(params) {
  return request(`/api/platform/system/commissionRule`, {
    method: 'post',
    data: params,
  });
}

export async function getCommissionRule(params) {
  return request(`/api/platform/system/commissionRule`, {
    method: 'get',
    params: params,
  });
}
