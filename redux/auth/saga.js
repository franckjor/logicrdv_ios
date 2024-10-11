import { takeLatest, call, put, select } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { sendRequest } from '../../utils/api';
import {loginRequest,setLoggedIn} from './actions'
import {createAppointmentRequest} from "../appointment/actions"
import * as RootNavigation from '../../routes/RootNavigation';
import {setUserData} from "../../utils/helpers";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  STEP_REQUEST,
  SIGNUP_CHECK,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_REQUEST
} from './types';



function* login({payload}) {
  try {
    const { optionalParam, ...restPayload } = payload;
    const { session ,params} = yield select(state => state.AppointmentReducer);
    const response = yield call(sendRequest, 'POST', 'login/process/', restPayload);
    if (response.data && response.data.user && response.data.user.tokenuser) {
      yield put({ type: LOGIN_SUCCESS, payload: { token: response.data.user.tokenuser } });
      yield setUserData(response.data.user);
      yield put(setLoggedIn(true,response.data.user));

      showMessage({
        message: 'Bienvenue !',
        description: `Vous êtes maintenant connecté.`,
        type: 'success',
        duration: 3500,
      });
      if(optionalParam === "apptconnect")
      {
         yield put(createAppointmentRequest(params.tokenappointment, params.week, params.data, params.action, session));
      }
    }     
    yield put({ type: STEP_REQUEST, payload: response.data });
  } catch (error) {
    yield put({ type: LOGIN_FAILURE , payload: error});
  }
}


function* signup({ payload }) {
  const { type, data } = payload;

  try {
    const endpoint = type === 'check' ? 'inscription/check/' : 'inscription/add/';
    const response = yield call(sendRequest, 'POST', endpoint, data);
    
    if (type === 'check') {
      yield put({ type: SIGNUP_CHECK, payload: response.data });
      return;
    } else {
       if ( response.message == "Etablissement ajouté à la liste de vos praticiens."){
        yield put({ type: SIGNUP_SUCCESS, payload: response.message });
        showMessage({
          message: 'Inscription reussie',
          description: `${response.message}`,
          type: 'success',
          duration: 3500,
        });
        yield put(loginRequest(response.params.email,"next","{\"step\":\"1\"}"));
        RootNavigation.navigate('Se connecter');
       }
       else 
       {
        yield put({ type: SIGNUP_SUCCESS, payload: response.data });
        showMessage({
          message: 'Echec inscription',
          description: `${response.message}`,
          type: 'danger',
          duration: 3500,
        });
       }

    }
  } catch (error) {
    yield put({ type: SIGNUP_FAILURE, payload: error });
  }
}


function* AuthSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(SIGNUP_REQUEST, signup);
}

export default AuthSaga;
