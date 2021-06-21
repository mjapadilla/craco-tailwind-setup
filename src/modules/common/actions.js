import { req } from 'react-reqq-lite';
import { formatedSelectOption } from './helper';

export const getDataSet = (params, key, callback = () => {}) => {
  req.get({
    key: 'GET_DATA_SETS',
    url: '/api/dataset',
    transform: (res) => {
      const data = formatedSelectOption(res, 'id', 'value');
      req.set(key, data);
      return data;
    },
    params,
    onSuccess: () => {
      callback();
    },
  });
};
