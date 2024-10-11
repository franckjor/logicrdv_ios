import { takeLatest, call, put, select } from 'redux-saga/effects';
import { sendRequest } from '../../utils/api';
import { getUserData,getInstallationId,setIsSubscribeNotification, setUserData } from "../../utils/helpers";
import WonderPush from 'react-native-wonderpush';
import { showMessage } from 'react-native-flash-message';
import {
  UNSUBSCRIBE_ACCOUNT_FAILURE,
  UNSUBSCRIBE_ACCOUNT_REQUEST,
  UNSUBSCRIBE_ACCOUNT_SUCCESS,
  INFORMATION_ACCOUNT_FAILURE,
  INFORMATION_ACCOUNT_REQUEST,
  INFORMATION_ACCOUNT_SUCCESS,
} from './types';


function* edit(payload) {
  try {
    const endpoint = 'account/setinfos/';
    const userData = yield getUserData();
    const { ...restPayload } = payload;
    const body = { "tokenuser": userData?.tokenuser, ...restPayload.payload }
    const response = yield call(sendRequest, 'POST', endpoint, body);
    if(response.httpstatut == 200)
    {
      yield put({ type: INFORMATION_ACCOUNT_SUCCESS, payload: response });
      // yield setUserData(body);
      showMessage({
        message: 'Mise à jour du profil',
        description: response.message,
        type: 'info',
        duration: 3500,
      });
    }
  } catch (error) {
    yield put({ type: INFORMATION_ACCOUNT_FAILURE, payload: error });
  }
}

function* unsubscribeAccount(payload) {
  try {
    const endpoint = 'account/checkout/';
    const userData = yield getUserData();
    const body = { "tokenuser": userData?.tokenuser }
    const response = yield call(sendRequest, 'POST', endpoint, body);
    if(response.httpstatut == 200)
    {
      yield put({ type: UNSUBSCRIBE_ACCOUNT_SUCCESS, payload: response });
      showMessage({
        message: 'Désinscription',
        description: response.message,
        type: 'info',
        duration: 3500,
      });
    }
  } catch (error) {
    yield put({ type: UNSUBSCRIBE_ACCOUNT_FAILURE, payload: error });
  }
}

function* SettingSaga() {
  yield takeLatest(INFORMATION_ACCOUNT_REQUEST, edit);
  yield takeLatest(UNSUBSCRIBE_ACCOUNT_REQUEST, unsubscribeAccount);
}

export default SettingSaga;
