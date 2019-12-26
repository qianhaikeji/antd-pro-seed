import request from '@/utils/request';
export async function getBillList(params) {
  return request(`/api/platform/bills`, {
    method: 'get',
    params: params,
  });
}

export async function getChannelBillList(params) {
  return request(`/api/channel/bills`, {
    method: 'get',
    params: params,
  });
}
