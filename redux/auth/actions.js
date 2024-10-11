import * as types from './types';

export const loginRequest = (data, action, session, optionalParam = null) => ({
  type: types.LOGIN_REQUEST,
  payload: { data, action, session , optionalParam},
});

export const signUpRequest = (type,data) => ({
  type: types.SIGNUP_REQUEST,
  payload: { type, data },
});

export const setLoggedIn = (isLoggedIn,dataUser) => ({
  type: types.SET_LOGGED_IN,
  payload: {isLoggedIn,dataUser},
});
