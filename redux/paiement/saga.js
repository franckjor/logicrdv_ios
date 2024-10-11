
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { sendRequest } from '../../utils/api';
import { setModalVisible } from '../app/actions';
import { cancelAppointmentRequest, createAppointmentRequest } from '../appointment/actions';
import { showMessage } from 'react-native-flash-message';
import { createPaymentMethod, confirmPayment } from '@stripe/stripe-react-native';
import {
  MAKE_PAIEMENT_REQUEST,
  MAKE_PAIEMENT_SUCCESS,
  MAKE_PAIEMENT_FAILURE
} from './types';


function* makePayment({ payload }) {

  const { dataPayment, session, params } = yield select(state => state.AppointmentReducer);
  try {
    console.log("payload.paymentIntent",payload.paymentIntent)
    const { paymentIntent, error } = yield confirmPayment(payload.paymentIntent, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        paymentMethodId: payload?.paymentMethodId,
      }
    });

    if (error) {
      if (payload.isConfirmation) {
        yield put(setModalVisible(true, error.localizedMessage));
        yield put(cancelAppointmentRequest({ tokenappointment: dataPayment.appointment }));
        yield put(createAppointmentRequest(params.tokenappointment,"", "","", session));
        yield put({ type: MAKE_PAIEMENT_FAILURE, payload: error });
      } else {
        yield put(setModalVisible(true, error.localizedMessage));
        yield put(cancelAppointmentRequest({ tokenappointment: dataPayment.appointment }));
        yield put(createAppointmentRequest(params.tokenappointment,"", "","", session));
        yield put({ type: MAKE_PAIEMENT_FAILURE, payload: error });
      }
    }
    else if (paymentIntent.status === 'RequiresCapture') {
      if (payload.isConfirmation) {
        yield put(createAppointmentRequest(params.tokenappointment, dataPayment?.apptbuttonvalidation.onclick_week, dataPayment?.apptbuttonvalidation.onclick_data, dataPayment?.apptbuttonvalidation.onclick_action, session));
        yield put({ type: MAKE_PAIEMENT_SUCCESS, payload: paymentIntent });
      } else {
        yield put({ type: MAKE_PAIEMENT_SUCCESS, payload: paymentIntent });
      }
    } else {
      yield put(setModalVisible(true, "Désolé, le paiement a échoué. Veuillez réessayer."));
      yield put({ type: MAKE_PAIEMENT_FAILURE, payload: paymentIntent });
      yield put(cancelAppointmentRequest({ tokenappointment: dataPayment.appointment }));
      yield put(createAppointmentRequest(params.tokenappointment,"", "","", session));

    }
  } catch (error) {
    yield put(setModalVisible(true, "Désolé, le paiement a échoué. Veuillez réessayer."));
    yield put(cancelAppointmentRequest({ tokenappointment: dataPayment.appointment }));
    yield put(createAppointmentRequest(params.tokenappointment,"", "","", session));
    yield put({ type: MAKE_PAIEMENT_FAILURE, payload: error });
  }
}


function* PaiementSaga() {
  yield takeLatest(MAKE_PAIEMENT_REQUEST, makePayment);
}

export default PaiementSaga;
