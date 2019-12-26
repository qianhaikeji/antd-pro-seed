import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Redirect } from 'umi';
import { stringify } from 'querystring';
import PageLoading from '@/components/PageLoading';

const SecurityLayout = ({ dispatch, rehydrated, loading, children, token }) => {
  const queryString = stringify({
    redirect: window.location.href,
  });

  if (!rehydrated || loading) {
    return <PageLoading />;
  }

  if (!token) {
    return <Redirect to={`/user/login?${queryString}`}></Redirect>;
  }

  return children;
};

export default connect(({ login, loading, _persist }) => ({
  token: login.token,
  loading: loading.models.login,
  rehydrated: _persist.rehydrated,
}))(SecurityLayout);
