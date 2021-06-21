import React from 'react';
import { req, useApiGet, useApiLoading } from 'react-reqq-lite';
import Cookie from 'js-cookie';
import * as c from './constants';
import * as actions from './actions';

export const useAuth = () => {
  const auth = useApiGet(c.AUTHENTICATION, {});
  React.useEffect(() => {
    const token = Cookie.get('_token');
    req.set(c.AUTHENTICATION, {
      isAuthenticated: !!token,
    });
  }, []);
  return [typeof auth.isAuthenticated === 'boolean', auth.isAuthenticated];
};

export const useLogin = () => {
  const isLoginApiLoading = useApiLoading(c.LOGIN, 'post');
  const login = React.useCallback((payload, callback) => {
    actions.login(payload, callback);
  }, []);
  return [isLoginApiLoading, login];
};
