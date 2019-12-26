import request from '@/utils/request';
export async function adminLogin(params) {
  return request(`/api/admin/token`, {
    method: 'post',
    data: params,
  });
}

export async function getAdminProfile(params) {
  return request(`/api/admin/profile`, {
    method: 'get',
    data: params,
  });
}