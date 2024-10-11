import { takeLatest, call, put } from 'redux-saga/effects';
import { sendRequest } from '../../utils/api';
import { getUserData } from "../../utils/helpers";
import {
LIST_MESSAGES_SUCCESS,
  LIST_MESSAGES_FAILURE,
  LIST_MESSAGES_REQUEST,
} from './types';

function* list({ payload }) {
  try {
    const endpoint = 'account/messages/';
    const userData = yield getUserData();
    const body = { "tokenuser": userData.tokenuser }
    const response = yield call(sendRequest, 'POST', endpoint, body);
    yield put({ type: LIST_MESSAGES_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('error', error);
    yield put({ type: LIST_MESSAGES_FAILURE, payload: error });
  }
}
function* MessageSaga() {
yield takeLatest(LIST_MESSAGES_REQUEST, list);
}
export default MessageSaga;