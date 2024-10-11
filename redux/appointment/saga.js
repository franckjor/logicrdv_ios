
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { sendRequest } from '../../utils/api';
import { getUserData } from "../../utils/helpers";
import { setModalVisible } from '../app/actions';
import { makePaiementRequest } from '../paiement/actions';
import { createAppointmentRequest } from './actions';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  LIST_APPOINTMENT_FAILURE,
  LIST_APPOINTMENT_REQUEST,
  LIST_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILURE,
  LIST_DOCTOR_REQUEST,
  LIST_DOCTOR_SUCCESS,
  LIST_DOCTOR_FAILURE,
  REMOVE_DOCTOR_REQUEST,
  REMOVE_DOCTOR_SUCCESS,
  REMOVE_DOCTOR_FORBIDDEN,
  REMOVE_DOCTOR_FAILURE,
  PAIEMENT_APPOINTMENT_REQUEST,
  PAIEMENT_APPOINTMENT_SUCCESS,
  PAIEMENT_APPOINTMENT_FAILURE,
  LIST_PATIENT_SUCCESS,
  LIST_PATIENT_FAILURE,
  LIST_PATIENT_REQUEST,
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILURE,
  UPDATE_PATIENT_LIST,
  EDIT_PATIENT_FAILURE,
  EDIT_PATIENT_REQUEST,
  EDIT_PATIENT_SUCCESS,
  REMOVE_PATIENT_FAILURE,
  REMOVE_PATIENT_REQUEST,
  REMOVE_PATIENT_SUCCESS,
  CANCEL_APPOINTMENT_SUCCESS,
  CANCEL_APPOINTMENT_REQUEST,
  CANCEL_APPOINTMENT_FAILURE,
} from './types';
import * as RootNavigation from '../../routes/RootNavigation';

function* list({ payload }) {
  try {
    const endpoint = 'account/appointments/';
    const userData = yield getUserData();
    const body = { "tokenuser": userData.tokenuser, "page": payload.data.page };
    const response = yield call(sendRequest, 'POST', endpoint, body);
    yield put({ type: LIST_APPOINTMENT_SUCCESS, payload: { list: response.data.list, page: payload.data.page, maxpage: response.data.pagination.maxpage } });
  } catch (error) {
    console.error('error', error);
    yield put({ type: LIST_APPOINTMENT_FAILURE, payload: { message: error.message } });
  }
}

function* listDoctor() {
  try {
    const endpoint = 'account/doctors/';
    const userData = yield getUserData();
    const body = { "tokenuser": userData.tokenuser }
    const response = yield call(sendRequest, 'POST', endpoint, body);
    yield put({ type: LIST_DOCTOR_SUCCESS, payload: response.data.activeEtabs });
  } catch (error) {
    console.error('error', error);
    yield put({ type: LIST_DOCTOR_FAILURE, payload: error });
  }
}

function* deleteDoctor({ payload }) {
  try {
    const endpoint = 'account/doctorremove/';
    const userData = yield getUserData();
    const body = { "tokenuser": userData.tokenuser, "id": payload.id.id }
    const response = yield call(sendRequest, 'POST', endpoint, body);
    if (response && response.httpstatut === 200) {
      yield put({ type: REMOVE_DOCTOR_SUCCESS, payload: { message: response.message } });
      yield listDoctor();
      showMessage({
        message: 'Suppression réussie',
        description: response.message,
        type: 'info',
        duration: 3500,
      });
    } else if (response && response.httpstatut === 403 && response.error === 'account_doctorremove_notpossible') {
      yield put({ type: REMOVE_DOCTOR_FORBIDDEN, payload: { message: response.message } });
      showMessage({
        message: 'Suppression impossible',
        description: response.message,
        type: 'warning',
        duration: 3500,
      });
    }
  } catch (error) {
    console.error('error', error);
    yield put({ type: REMOVE_DOCTOR_FAILURE, payload: error.message });
  }
}

function* addDoctor(id, phone, tokenuser) {
  try {
    const { session, params, data } = yield select(state => state.AppointmentReducer);
    const endpoint = 'account/doctoradd/';
    const body = { "id": id, "phone": phone, "tokenuser": tokenuser };
    const response = yield call(sendRequest, 'POST', endpoint, body);
    if (response.httpstatut == 200) {
      yield put(createAppointmentRequest(params.tokenappointment, data[0].onclick_week, data[0].onclick_data, data[0].onclick_action, session));
    }
    else {
      yield RootNavigation.navigate('Mes rendez-vous');
      yield put(setModalVisible(true, "Impossible d'ajouter le cabinet médical. Veuillez réessayer plus tard."));
    }
  } catch (error) {
    console.error('error', error);
    yield RootNavigation.navigate('Mes rendez-vous');
    yield put(setModalVisible(true, "Impossible d'ajouter le cabinet médical. Veuillez réessayer plus tard."));
  }
}

function* listPatient({ payload }) {
  try {
    const endpoint = 'patients/list/';
    const { tokenappt } = payload;
    const userData = yield getUserData();
    const body = { "tokenuser": userData.tokenuser, "tokenappt": tokenappt }
    const response = yield call(sendRequest, 'POST', endpoint, body);
    yield put({ type: LIST_PATIENT_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('error', error);
    yield put({ type: LIST_PATIENT_FAILURE, payload: error });
  }
}

function* addPatient({ payload }) {
  try {
    const endpoint = 'patients/add/';
    const { ...restPayload } = payload;
    const userData = yield getUserData();
    const body = { "tokenuser": userData.tokenuser, ...restPayload }
    const response = yield call(sendRequest, 'POST', endpoint, body);
    if (response.httpstatut == 200) {
      yield put({ type: ADD_PATIENT_SUCCESS, payload: response.data });
      yield put({ type: UPDATE_PATIENT_LIST, payload: response.data });
      showMessage({
        message: 'Ajout réussi',
        description: 'Patient ajouté dans la liste des patients.',
        type: 'info',
        duration: 3500,
      });
    }

  } catch (error) {
    console.error('error', error);
    yield put({ type: ADD_PATIENT_FAILURE, payload: error });
  }
}

function* editPatient({ payload }) {
  try {
    const endpoint = 'patients/modify/';
    const { ...restPayload } = payload;
    const userData = yield getUserData();
    const body = { "tokenuser": userData.tokenuser, ...restPayload }
    const response = yield call(sendRequest, 'POST', endpoint, body);
    if (response.httpstatut == 200) {
      yield put({ type: EDIT_PATIENT_SUCCESS, payload: response.data });
      yield put({ type: UPDATE_PATIENT_LIST, payload: response.data });
      showMessage({
        message: 'Modification du patient',
        description: response.message,
        type: 'info',
        duration: 3500,
      });
    }

  } catch (error) {
    console.error('error', error);
    yield put({ type: EDIT_PATIENT_FAILURE, payload: error });
  }
}

function* removePatient({ payload }) {
  try {
    const endpoint = 'patients/remove/';
    const { ...restPayload } = payload;
    const userData = yield getUserData();
    const body = { "tokenuser": userData.tokenuser, ...restPayload }
    const response = yield call(sendRequest, 'POST', endpoint, body);
    if (response.httpstatut == 200) {
      yield put({ type: REMOVE_PATIENT_SUCCESS, payload: response.data });
      yield put({ type: UPDATE_PATIENT_LIST, payload: response.data });
      showMessage({
        message: 'Suppression du patient',
        description: response.message,
        type: 'info',
        duration: 3500,
      });
    }

  } catch (error) {
    console.error('error', error);
    yield put({ type: REMOVE_PATIENT_FAILURE, payload: error });
  }
}

// function* create({ payload }) {
//   try {
//     const endpoint = 'appointment/create/';
//     const userData = yield getUserData();
//     const { optionalParam, ...restPayload } = payload;
//     const body = { "tokenuser": userData?.tokenuser, ...restPayload }
//     const response = yield call(sendRequest, 'POST', endpoint, body);
//     yield put({ type: CREATE_APPOINTMENT_SUCCESS, payload: response });
//     console.log("response  :", response)

//     switch (response.data.type) {
//       case "appttype":
//         yield RootNavigation.navigate('Motif du Rendez-vous', { tokenappointment: response.params.tokenappointment });
//         break;

//       case "apptcreneaux":
//         yield RootNavigation.navigate('Jour et Heure du Rdv', { tokenappointment: response.params.tokenappointment, title: payload.optionalParam });
//         break;

//       case "apptnothing":
//         yield put(setModalVisible(false, ""));
//         yield put(setModalVisible(true, response.data.headermessage));
//         break;

//       case "apptpatients":
//         console.log("response.data.data", response.data.data)
//         yield RootNavigation.navigate('Liste des patients', { tokenappointment: response.params.tokenappointment });
//         break;

//       case "apptconnect":
//         yield RootNavigation.navigate('Se connecter', { type: response.data.type, isAppt: true });
//         showMessage({
//           message: 'Se connecter',
//           description: response.data.headermessage,
//           type: 'info',
//           duration: 3500,
//         });
//         break;

//       case "apptlocked":
//         yield put(setModalVisible(false, ""));
//         if (response?.data?.data[0]?.label === "Je confirme être patient") {
//           yield RootNavigation.navigate('Confirmation patient', { tokenappointment: response.params.tokenappointment });
//         } else {
//           yield put(setModalVisible(true, response.data.headermessage));
//         }
//         break;

//       case "apptconfirm":
//         yield RootNavigation.navigate('Valider le Rendez-vous', { tokenappointment: response.params.tokenappointment });
//         showMessage({
//           message: 'Validation du rendez-vous',
//           description: response.data.headermessage,
//           type: 'info',
//           duration: 3500,
//         });
//         break;

//       case "apptvalided":
//         yield RootNavigation.navigate('Confirmation rdv', { tokenappointment: response.params.tokenappointment });
//         break;
//       case "apptdoctoradd":
//         const session = response.data.session;
//         const JsonSession = JSON.parse(session.replace(/\\"/g, '"'));
//         yield put(setModalVisible(true, response.data.headermessage.replace(/\./g, " ") + JsonSession.rdvworkername.replace(/<br>/gi, "")));
//         yield addDoctor(response.data.data[0].id, response.data.data[0].phone, userData?.tokenuser);
//         break;
//       case "apptstripeandautovalide":
//         yield put(makePaiementRequest(optionalParam,response.data.payment_intent.stripeClientSecret, true));
//         break;
//       default:
//         break;
//     }

//   } catch (error) {
//     console.log("error:", error)
//     yield put({ type: CREATE_APPOINTMENT_FAILURE, payload: error });
//   }
// }

function* create({ payload }) {
  try {
    const endpoint = 'appointment/create/';
    const userData = yield getUserData();
    const { optionalParam, ...restPayload } = payload;
    const body = { "tokenuser": userData?.tokenuser, ...restPayload }
      const response = yield call(sendRequest, 'POST', endpoint, body);
      yield put({ type: CREATE_APPOINTMENT_SUCCESS, payload: response });
      switch (response.data.type) {
        case "appttype":
          yield RootNavigation.navigate('Motif du Rendez-vous', { tokenappointment: response.params.tokenappointment });
          break;
  
        case "apptcreneaux":
          yield RootNavigation.navigate('Jour et Heure du Rdv', { tokenappointment: response.params.tokenappointment, title: payload.optionalParam });
          break;
  
        case "apptnothing":
          yield put(setModalVisible(false, ""));
          yield put(setModalVisible(true, response.data.headermessage));
          break;
  
        case "apptpatients":
          console.log("response.data.data", response.data.data)
          yield RootNavigation.navigate('Liste des patients', { tokenappointment: response.params.tokenappointment });
          break;
  
        case "apptconnect":
          yield RootNavigation.navigate('Se connecter', { type: response.data.type, isAppt: true });
          showMessage({
            message: 'Se connecter',
            description: response.data.headermessage,
            type: 'info',
            duration: 3500,
          });
          break;
  
        case "apptlocked":
          yield put(setModalVisible(false, ""));
          if (response?.data?.data[0]?.label === "Je confirme être patient") {
            yield RootNavigation.navigate('Confirmation patient', { tokenappointment: response.params.tokenappointment });
          } else {
            yield put(setModalVisible(true, response.data.headermessage));
          }
          break;
  
        case "apptconfirm":
          yield RootNavigation.navigate('Valider le Rendez-vous', { tokenappointment: response.params.tokenappointment });
          showMessage({
            message: 'Validation du rendez-vous',
            description: response.data.headermessage,
            type: 'info',
            duration: 3500,
          });
          break;
  
        case "apptvalided":
          yield RootNavigation.navigate('Confirmation rdv', { tokenappointment: response.params.tokenappointment });
          break;
        case "apptdoctoradd":
          const session = response.data.session;
          const JsonSession = JSON.parse(session.replace(/\\"/g, '"'));
          yield put(setModalVisible(true, response.data.headermessage.replace(/\./g, " ") + JsonSession.rdvworkername.replace(/<br>/gi, "")));
          yield addDoctor(response.data.data[0].id, response.data.data[0].phone, userData?.tokenuser);
          break;
        case "apptstripeandautovalide":
          yield put(makePaiementRequest(optionalParam?.paymentMethodId,response.data.payment_intent.stripeClientSecret, true));
          break;
        default:
          break;
      }  

 
  } catch (error) {
    console.log("error:", error)
    yield put({ type: CREATE_APPOINTMENT_FAILURE, payload: error });
  }
}


// function* cancelAppt({ payload }) {
//   try {
//     const endpoint = 'account/appcancel/';
//     const userData = yield getUserData();
//     const body = { "tokenuser": userData.tokenuser, "token": payload.token.tokenappointment };
//     console.log(body);
//     const response = yield call(sendRequest, 'POST', endpoint, body);
//     console.log(response);

//     if (response && response.httpstatut === 200) {
//       yield put({ type: CANCEL_APPOINTMENT_SUCCESS, payload: { message: response.message } });
//       showMessage({
//         message: 'Annulation du rdv',
//         description: 'Rendez-vous annulé avec succès!',
//         type: 'info',
//         duration: 3500,
//       });
//     } else {
//       const errorMessage = response ? response.message || 'Erreur lors de l\'annulation du rendez-vous' : 'Réponse de l\'API non définie';
//       yield put({ type: CANCEL_APPOINTMENT_FAILURE, payload: { message: errorMessage } });
//     }
//   } catch (error) {
//     console.error('error', error);
//     yield put({ type: CANCEL_APPOINTMENT_FAILURE, payload: { message: error.message || 'Erreur inconnue' } });
//   }
// }

function* cancelAppt({ payload }) {
  try {
    const endpoint = 'account/appcancel/';
    const userData = yield getUserData();
    const body = { "tokenuser": userData.tokenuser, "token": payload.token.tokenappointment };
    const response = yield call(sendRequest, 'POST', endpoint, body);

    if (response && response.httpstatut === 200) {
      yield put({ type: CANCEL_APPOINTMENT_SUCCESS, payload: { message: response.message } });
      // showMessage({
      //   message: 'Annulation du rdv',
      //   description: 'Rendez-vous annulé avec succès!',
      //   type: 'info',
      //   duration: 3500,
      // });
    } else {
      const errorMessage = response ? response.message || 'Erreur lors de l\'annulation du rendez-vous' : 'Réponse de l\'API non définie';
      yield put({ type: CANCEL_APPOINTMENT_FAILURE, payload: { message: errorMessage } });
    }
  } catch (error) {
    console.error('error', error);
    yield put({ type: CANCEL_APPOINTMENT_FAILURE, payload: { message: error.message || 'Erreur inconnue' } });
  }
}


function* paiementAppt({ payload }) {
  try {
    const endpoint = 'teleconsultation/get/';
    const response = yield call(sendRequest, 'POST', endpoint, payload);
    yield put({ type: PAIEMENT_APPOINTMENT_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('error', error);
    yield put({ type: PAIEMENT_APPOINTMENT_FAILURE, payload: error });
  }
}

function* AppointmentSaga() {
  yield takeLatest(LIST_APPOINTMENT_REQUEST, list);
  yield takeLatest(LIST_DOCTOR_REQUEST, listDoctor);
  yield takeLatest(REMOVE_DOCTOR_REQUEST, deleteDoctor);
  yield takeLatest(LIST_PATIENT_REQUEST, listPatient);
  yield takeLatest(ADD_PATIENT_REQUEST, addPatient);
  yield takeLatest(EDIT_PATIENT_REQUEST, editPatient);
  yield takeLatest(REMOVE_PATIENT_REQUEST, removePatient);
  yield takeLatest(CREATE_APPOINTMENT_REQUEST, create);
  yield takeLatest(CANCEL_APPOINTMENT_REQUEST, cancelAppt);
  yield takeLatest(PAIEMENT_APPOINTMENT_REQUEST, paiementAppt);
}

export default AppointmentSaga;
