import request from '@/utils/request';

export async function getSystemVersion(params) {
  return request(`/api/system/version`, {
    method: 'get',
    params: params,
  });
}
