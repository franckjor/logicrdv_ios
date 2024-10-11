import * as types from './types';

export const listAppointmentsRequest = (data) => ({
  type: types.LIST_APPOINTMENT_REQUEST,
  payload: {data},
});

export const createAppointmentRequest = (tokenappointment, week, data, action, session, optionalParam = null) => ({
  type: types.CREATE_APPOINTMENT_REQUEST,
  payload: { tokenappointment, week, data, action, session, optionalParam },
});

export const cancelAppointmentRequest = (token) => ({
  type: types.CANCEL_APPOINTMENT_REQUEST,
  payload: { token },
});

export const listDoctorRequest = (data) => ({
  type: types.LIST_DOCTOR_REQUEST,
  payload: { data },
});

export const removeDoctorRequest = (id) => ({
  type: types.REMOVE_DOCTOR_REQUEST,
  payload: { id },
});

export const listPatientRequest = (tokenappt) => ({
  type: types.LIST_PATIENT_REQUEST,
  payload: { tokenappt },
});

export const addPatientRequest = (email, nom, phone, prenom, tokenappt) => ({
  type: types.ADD_PATIENT_REQUEST,
  payload: { email, nom, phone, prenom, tokenappt },
});

export const editPatientRequest = (tokenappt, tokenpatient, email, prenom, phone, nom) => ({
  type: types.EDIT_PATIENT_REQUEST,
  payload: { tokenappt, tokenpatient, email, prenom, phone, nom },
});

export const removePatientRequest = (tokenappt, tokenpatient) => ({
  type: types.REMOVE_PATIENT_REQUEST,
  payload: { tokenappt, tokenpatient },
});

export const paiementApptRequest = (tokentelecons) => ({
  type: types.PAIEMENT_APPOINTMENT_REQUEST,
  payload: { tokentelecons },
});

export const clearAppointmentData = () => ({
  type: types.CLEAR_APPOINTMENT_DATA,
});

export const clearPatientList = () => ({
  type: types.CLEAR_PATIENT_LIST,
});
