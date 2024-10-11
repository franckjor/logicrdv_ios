import * as types from './types';

export const unsubscribeAccount = () => ({
  type: types.UNSUBSCRIBE_ACCOUNT_REQUEST,
});

export const informationAccount = (information) => ({
  type: types.INFORMATION_ACCOUNT_REQUEST,
  payload: information
});

