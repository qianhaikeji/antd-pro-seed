import request from '@/utils/request';
export async function getMarketMakerList(params) {
  return request(`/api/platform/marketMakers`, {
    method: 'get',
    params: params,
  });
}

export async function createMarketMaker(params) {
  return request(`/api/platform/marketMakers`, {
    method: 'post',
    data: params,
  });
}

export async function modifyMarketMaker(id, params) {
  return request(`/api/platform/marketMakers/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function deleteMarketMaker(id) {
  return request(`/api/platform/marketMakers/${id}`, {
    method: 'delete',
  });
}

export async function getMarketMakerExchangeList(id, params) {
  return request(`/api/platform/marketMakers/${id}/exchanges`, {
    method: 'get',
    params: params,
  });
}

export async function createMarketMakerExchange(params) {
  return request(`/api/platform/marketMakerExchanges`, {
    method: 'post',
    data: params,
  });
}

export async function modifyMarketMakerExchange(id, params) {
  return request(`/api/platform/marketMakerExchanges/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function deleteMarketMakerExchange(id) {
  return request(`/api/platform/marketMakerExchanges/${id}`, {
    method: 'delete',
  });
}
