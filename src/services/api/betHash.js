import request from '@/utils/request';
export async function getBetHashList(params) {
  return request(`/api/platform/betHashs`, {
    method: 'get',
    params: params,
  });
}

export async function getBetHashDetail(id, params) {
  return request(`/api/platform/betHashs/${id}`, {
    method: 'get',
    params: params,
  });
}

export async function createBetHash(params) {
  return request(`/api/platform/betHashs`, {
    method: 'post',
    data: params,
  });
}

export async function modifyBetHash(id, params) {
  return request(`/api/platform/betHashs/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function getBetHashPrizeList(params) {
  return request(`/api/platform/betHashPrizes`, {
    method: 'get',
    params: params,
  });
}

export async function batchModifyBetHashPrizeList(params) {
  return request(`/api/platform/betHashPrize/batchModify`, {
    method: 'post',
    data: params,
  });
}

export async function getBetHashRecordList(params) {
  return request(`/api/platform/betHash/records`, {
    method: 'get',
    params: params,
  });
}

export async function getUserBetHashRecordList(params) {
  return request(`/api/user/betHash/records`, {
    method: 'get',
    params: params,
  });
}

export async function postBetHashRecord(id, params) {
  return request(`/api/user/betHashs/${id}/records`, {
    method: 'post',
    data: params,
  });
}
