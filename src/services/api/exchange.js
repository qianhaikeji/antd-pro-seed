import request from '@/utils/request';
export async function getExchangeList(params) {
  return request(`/api/platform/exchanges`, {
    method: 'get',
    params: params,
  });
}

export async function createExchange(params) {
  return request(`/api/platform/exchanges`, {
    method: 'post',
    data: params,
  });
}

export async function modifyExchange(id, params) {
  return request(`/api/platform/exchanges/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function deleteExchange(id) {
  return request(`/api/platform/exchanges/${id}`, {
    method: 'delete',
  });
}

export async function getChannelExchangeList(params) {
  return request(`/api/channel/exchanges`, {
    method: 'get',
    params: params,
  });
}
