import request from '@/utils/request';
export async function getSettlementList(params) {
  return request(`/api/platform/settlements`, {
    method: 'get',
    params: params,
  });
}

export async function modifySettlement(id, params) {
  return request(`/api/platform/settlements/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function getChannelSettlementList(params) {
  return request(`/api/channel/settlements`, {
    method: 'get',
    params: params,
  });
}

export async function withdrawChannelSettlement(id, params) {
  return request(`/api/channel/settlements/${id}/withdraw`, {
    method: 'post',
    data: params,
  });
}
