import request from '@/utils/request';
export async function getCommissionList(params) {
  return request(`/api/platform/commissions`, {
    method: 'get',
    params: params,
  });
}

export async function getChannelCommissionList(params) {
  return request(`/api/channel/commissions`, {
    method: 'get',
    params: params,
  });
}
