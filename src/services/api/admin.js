import request from '@/utils/request';
export async function getAdminList(params) {
  return request(`/api/platform/admins`, {
    method: 'get',
    params: params,
  });
}

export async function getAdminDetail(id, params) {
  return request(`/api/platform/admins/${id}`, {
    method: 'get',
    params: params,
  });
}

export async function createAdmin(params) {
  return request(`/api/platform/admins`, {
    method: 'post',
    data: params,
  });
}

export async function modifyAdmin(id, params) {
  return request(`/api/platform/admins/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function deleteAdmin(id) {
  return request(`/api/platform/admins/${id}`, {
    method: 'delete',
  });
}

export async function changeAdminPassword(id, params) {
  return request(`/api/platform/admins/${id}/resetPassword`, {
    method: 'put',
    data: params,
  });
}
