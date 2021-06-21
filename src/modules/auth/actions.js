import { req } from 'react-reqq-lite';
import Cookie from 'js-cookie';
import * as c from './constants';

export const login = (payload, callback = () => {}) => {
  req.post({
    key: c.LOGIN,
    url: '/api/auth',
    payload,
    onSuccess: ({ response: { data } }) => {
      const profile = {
        ...data?.user,
        ...data?.user?.profile,
      };
      Cookie.set('_token', data?.token);
      req.set(c.AUTHENTICATION, {
        isAuthenticated: true,
      });
      callback(profile);
    },
  });
};

export const logout = () => {
  Cookie.remove('_token');
  Cookie.remove('_profile');
  req.reset();
  req.set(c.AUTHENTICATION, {
    isAuthenticated: false,
  });
};
