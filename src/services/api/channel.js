import request from '@/utils/request';
export async function getChannelList(params) {
  return request(`/api/platform/channels`, {
    method: 'get',
    params: params,
  });
}

export async function createChannel(params) {
  return request(`/api/platform/channels`, {
    method: 'post',
    data: params,
  });
}

export async function modifyChannel(id, params) {
  return request(`/api/platform/channels/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function deleteChannel(id) {
  return request(`/api/platform/channels/${id}`, {
    method: 'delete',
  });
}

export async function changeChannelPassword(id, params) {
  return request(`/api/platform/channels/${id}/resetPassword`, {
    method: 'put',
    data: params,
  });
}

export async function getChannelExchangeList(params) {
  return request(`/api/platform/channelExchanges`, {
    method: 'get',
    params: params,
  });
}

export async function modifyChannelExchange(id, params) {
  return request(`/api/platform/channelExchanges/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function batchSwitchChannelExchange(params) {
  return request(`/api/platform/channelExchange/batchSwitch`, {
    method: 'post',
    data: params,
  });
}

export async function getChannelChildrenList(params) {
  return request(`/api/channel/children`, {
    method: 'get',
    params: params,
  });
}
