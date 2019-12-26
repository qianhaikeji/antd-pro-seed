import request from '@/utils/request';
export async function getContractList(params) {
  return request(`/api/platform/contracts`, {
    method: 'get',
    params: params,
  });
}

export async function getContractDetail(id, params) {
  return request(`/api/platform/contracts/${id}`, {
    method: 'get',
    params: params,
  });
}

export async function createContract(params) {
  return request(`/api/platform/contracts`, {
    method: 'post',
    data: params,
  });
}

export async function modifyContract(id, params) {
  return request(`/api/platform/contracts/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function deleteContract(id) {
  return request(`/api/platform/contracts/${id}`, {
    method: 'delete',
  });
}
