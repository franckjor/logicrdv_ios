
import {
  LIST_APPOINTMENT_FAILURE,
  LIST_APPOINTMENT_REQUEST,
  LIST_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILURE,
  CANCEL_APPOINTMENT_REQUEST,
  CANCEL_APPOINTMENT_SUCCESS,
  CANCEL_APPOINTMENT_FAILURE,
  LIST_DOCTOR_REQUEST,
  LIST_DOCTOR_SUCCESS,
  LIST_DOCTOR_FAILURE,
  REMOVE_DOCTOR_REQUEST,
  REMOVE_DOCTOR_SUCCESS,
  REMOVE_DOCTOR_FAILURE,
  REMOVE_DOCTOR_FORBIDDEN,
  LIST_PATIENT_REQUEST,
  LIST_PATIENT_SUCCESS,
  LIST_PATIENT_FAILURE,
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILURE,
  EDIT_PATIENT_REQUEST,
  EDIT_PATIENT_SUCCESS,
  EDIT_PATIENT_FAILURE,
  PAIEMENT_APPOINTMENT_REQUEST,
  PAIEMENT_APPOINTMENT_SUCCESS,
  PAIEMENT_APPOINTMENT_FAILURE,
  UPDATE_PATIENT_LIST,
  REMOVE_PATIENT_REQUEST,
  REMOVE_PATIENT_SUCCESS,
  REMOVE_PATIENT_FAILURE,
  CLEAR_APPOINTMENT_DATA,
  CLEAR_PATIENT_LIST,
} from './types';

const initialState = {
  isLoading: false,
  list: [],
  page: 1,
  listDoctor: [],
  listPatient: [],
  step: 0,
  navigation: [],
  dataMotifs: [],
  dataCreneaux: [],
  dataPatients: [],
  dataNothing: [],
  dataPatients: [],
  dataConnect: [],
  dataLocked: [],
  dataConfirm: [],
  dataValided: [],
  dataDoctorAdd: [],
  dataPayment: [],
  dataAutoValidate:[],
  patient: [],
  headerMessage: '',
  type: '',
  session: '',
  doctorDeletedMessage: '',
  apptCanceledMessage: '',
  error: '',
  params: {},
  message: '',
  paiement: [],
  paiementIntent: "", 
  maxpage: 1
};

const AppointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_APPOINTMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LIST_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: state.page === 1 ? action.payload.list : [...state.list, ...action.payload.list],
        // list: state.page === 1 ? action.payload.list : state.list.concat(action.payload.list),
        page: action.payload.page,
        maxpage: action.payload.maxpage
      };
    case LIST_APPOINTMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        list: []
      };

    case CREATE_APPOINTMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        navigation: [],
        dataMotifs: [],
        dataCreneaux: [],
        dataPatients: [],
        dataNothing: [],
        dataPatients: [],
        dataLocked: [],
        headerMessage: '',
        error: '',
        message: '',
        type: '',
        paiementIntent: ""
      };
    case CREATE_APPOINTMENT_SUCCESS:
      switch (action.payload.data.type) {
        case "appttype":
          return {
            ...state,
            isLoading: false,
            dataPayment:[],
            navigation: action.payload.data.navigation,
            dataMotifs: action.payload.data.data,
            headerMessage: action.payload.data.headermessage,
            error: action.payload.error,
            message: action.payload.message,
            params: action.payload.params,
            type: action.payload.data.type,
            session: action.payload.data.session,
          };
        case "apptcreneaux":
          return {
            ...state,
            isLoading: false,
            navigation: action.payload.data.navigation,
            dataCreneaux: action.payload.data.data,
            headerMessage: action.payload.data.headermessage,
            error: action.payload.error,
            message: action.payload.message,
            params: action.payload.params,
            type: action.payload.data.type,
            session: action.payload.data.session,
          };
        case "apptnothing":
          return {
            ...state,
            isLoading: false,
            navigation: action.payload.data.navigation,
            dataNothing: action.payload.data.data,
            headerMessage: action.payload.data.headermessage,
            error: action.payload.error,
            message: action.payload.message,
            params: action.payload.params,
            type: action.payload.data.type,
            session: action.payload.data.session,
          };

        case "apptpatients":
          return {
            ...state,
            isLoading: false,
            navigation: action.payload.data.navigation,
            dataPatients: action.payload.data.data,
            headerMessage: action.payload.data.headermessage,
            error: action.payload.error,
            message: action.payload.message,
            params: action.payload.params,
            type: action.payload.data.type,
            session: action.payload.data.session,
          };

        case "apptconnect":
          return {
            ...state,
            isLoading: false,
            navigation: action.payload.data.navigation,
            dataConnect: action.payload.data.data,
            headerMessage: action.payload.data.headermessage,
            error: action.payload.error,
            message: action.payload.message,
            params: action.payload.params,
            type: action.payload.data.type,
            session: action.payload.data.session,
          };

        case "apptlocked":
          return {
            ...state,
            isLoading: false,
            navigation: action.payload.data.navigation,
            dataLocked: action.payload.data.data,
            headerMessage: action.payload.data.headermessage,
            error: action.payload.error,
            message: action.payload.message,
            params: action.payload.params,
            type: action.payload.data.type,
            session: action.payload.data.session,
          };

        case "apptconfirm":
          return {
            ...state,
            isLoading: false,
            navigation: action.payload.data.navigation,
            dataConfirm: action.payload.data.data,
            headerMessage: action.payload.data.headermessage,
            error: action.payload.error,
            message: action.payload.message,
            params: action.payload.params,
            type: action.payload.data.type,
            paiementIntent: ('payment_intent' in action.payload.data) ? action.payload.data.payment_intent.stripeClientSecret : "",
            session: action.payload.data.session,
          };

        case "apptvalided":
          return {
            ...state,
            isLoading: false,
            navigation: action.payload.data.navigation,
            dataValided: action.payload.data.data,
            headerMessage: action.payload.data.headermessage,
            error: action.payload.error,
            message: action.payload.message,
            params: action.payload.params,
            type: action.payload.data.type,
            paiementIntent: ('payment_intent' in action.payload.data) ? action.payload.data.payment_intent.stripeClientSecret : "",
            session: action.payload.data.session,
          };
        case "apptdoctoradd":
          return {
            ...state,
            isLoading: false,
            navigation: action.payload.data.navigation,
            dataDoctorAdd: action.payload.data.data,
            headerMessage: action.payload.data.headermessage,
            error: action.payload.error,
            message: action.payload.message,
            params: action.payload.params,
            type: action.payload.data.type,
            paiementIntent: ('payment_intent' in action.payload.data) ? action.payload.data.payment_intent.stripeClientSecret : "",
            session: action.payload.data.session,
          };
        case "apptstripeandautovalide":
          return {
            ...state,
            isLoading: false,
            navigation: action.payload.data.navigation,
            dataPayment: action.payload.data.data,
            headerMessage: action.payload.data.headermessage,
            error: action.payload.error,
            message: action.payload.message,
            params: action.payload.params,
            type: action.payload.data.type,
            paiementIntent: ('payment_intent' in action.payload.data) ? action.payload.data.payment_intent.stripeClientSecret : "",
            session: action.payload.data.session,
          };
          case "apptautovalide":
            return {
              ...state,
              isLoading: false,
              navigation: action.payload.data.navigation,
              dataAutoValidate: action.payload.data.data,
              headerMessage: action.payload.data.headermessage,
              error: action.payload.error,
              message: action.payload.message,
              params: action.payload.params,
              type: action.payload.data.type,
              session: action.payload.data.session,
            };
        default:
          break;
      }

    case CREATE_APPOINTMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    case CANCEL_APPOINTMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CANCEL_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        apptCanceledMessage: action.payload.message
      };
    case CANCEL_APPOINTMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case LIST_DOCTOR_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LIST_DOCTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listDoctor: action.payload
      };
    case LIST_DOCTOR_FAILURE:
      return {
        ...state,
        isLoading: false,
        listDoctor: []
      };

    case REMOVE_DOCTOR_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case REMOVE_DOCTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        doctorDeletedMessage: action.payload.message
      };
    case REMOVE_DOCTOR_FORBIDDEN:
      return {
        ...state,
        isLoading: false,
        doctorDeletedMessage: action.payload.message
      };
    case REMOVE_DOCTOR_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case LIST_PATIENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LIST_PATIENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listPatient: action.payload
      };
    case LIST_PATIENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        listPatient: []
      };

    case ADD_PATIENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_PATIENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        patient: action.payload
      };
    case ADD_PATIENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        patient: []
      };

    case EDIT_PATIENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_PATIENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        patient: action.payload
      };
    case EDIT_PATIENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        patient: []
      };

    case REMOVE_PATIENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case REMOVE_PATIENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        patient: action.payload
      };
    case REMOVE_PATIENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        patient: []
      };

    case UPDATE_PATIENT_LIST:
      return {
        ...state,
        listPatient: action.payload,
      };

    case PAIEMENT_APPOINTMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case PAIEMENT_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        paiement: action.payload
      };
    case PAIEMENT_APPOINTMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        paiement: []
      };
    case CLEAR_APPOINTMENT_DATA:
      return {
        ...state,
        isLoading: false,
        navigation: [],
        dataMotifs: [],
        dataCreneaux: [],
        session: '',
      };

    case CLEAR_PATIENT_LIST:
      return {
        ...state,
        listPatient: [],
      };

    default:
      return state;
  }
};

export default AppointmentReducer;
