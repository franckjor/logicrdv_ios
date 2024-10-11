import { takeLatest, call, put } from 'redux-saga/effects';
import { sendRequest } from '../../utils/api';
import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  RESULT_REQUEST,
  RESULT_SUCCESS,
  RESULT_FAILURE,
  INFO_DOCTOR_FAILURE,
  INFO_DOCTOR_REQUEST,
  INFO_DOCTOR_SUCCESS
} from './types';

function* search({ payload }) {
  const { data } = payload;
  try {
    const endpoint = 'search/city/';
    const response = yield call(sendRequest, 'POST', endpoint, data);
    yield put({ type: SEARCH_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('error', error);
    yield put({ type: SEARCH_FAILURE, payload: error });
  }
}

function* result({ payload }) {
  const { data } = payload;
  try {
    const endpoint = 'search/list/';
    const response = yield call(sendRequest, 'POST', endpoint, data);
    yield put({ type: RESULT_SUCCESS, payload: response.data });
    
  } catch (error) {
    console.error('error', error);
    yield put({ type: RESULT_FAILURE, payload: error });
  }
}

function* infoDoctor({ payload }) {
  try {
    const endpoint = 'search/profil/';
    const response = yield call(sendRequest, 'POST', endpoint, payload.data);
    yield put({ type: INFO_DOCTOR_SUCCESS, payload: response });
  } catch (error) {
    console.error('error', error);
    yield put({ type: INFO_DOCTOR_FAILURE, payload: error });
  }
}

function* SearchSaga() {
  yield takeLatest(SEARCH_REQUEST, search);
  yield takeLatest(RESULT_REQUEST, result);
  yield takeLatest(INFO_DOCTOR_REQUEST, infoDoctor);
}

export default SearchSaga;
