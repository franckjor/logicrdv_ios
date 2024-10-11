import * as types from './types';

export const searchRequest = (data) => ({
  type: types.SEARCH_REQUEST,
  payload: { data },
});

export const resultRequest = (data) => ({
  type: types.RESULT_REQUEST,
  payload: { data },
});

export const infosDoctorRequest = (data) => ({
  type: types.INFO_DOCTOR_REQUEST,
  payload: { data },
});
