import request from '@/utils/request';
export async function platformLogin(params) {
  return request(`/api/platform/token`, {
    method: 'post',
    data: params,
  });
}

export async function getPlatformProfile(params) {
  return request(`/api/platform/profile`, {
    method: 'get',
    data: params,
  });
}

export async function channelLogin(params) {
  return request(`/api/channel/token`, {
    method: 'post',
    data: params,
  });
}

export async function getChannelProfile(params) {
  return request(`/api/channel/profile`, {
    method: 'get',
    params: params,
  });
}

export async function changeChannelPassword(params) {
  return request(`/api/channel/resetPassword`, {
    method: 'post',
    data: params,
  });
}
