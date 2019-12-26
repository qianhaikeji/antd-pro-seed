import request from '@/utils/request';
export async function getBillEggList(params) {
  return request(`/api/platform/billEggs`, {
    method: 'get',
    params: params,
  });
}

export async function createBillEgg(params) {
  return request(`/api/platform/billEggs`, {
    method: 'post',
    data: params,
  });
}

export async function modifyBillEgg(id, params) {
  return request(`/api/platform/billEggs/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function getBillEggPrizeList(params) {
  return request(`/api/platform/billEggPrizes`, {
    method: 'get',
    params: params,
  });
}

export async function batchModifyBillEggPrizeList(params) {
  return request(`/api/platform/billEggPrize/batchModify`, {
    method: 'post',
    data: params,
  });
}
