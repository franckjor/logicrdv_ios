import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  STEP_REQUEST,
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_CHECK,
  SET_LOGGED_IN
} from './types';

const initialState = {
  isLoggedIn: false,
  userData:null,
  isLoading: false,
  step: 0,
  session: '',
  failure:'',
  headerMessage: '',
  headerError: '',
  inputFields: [],
  buttons: [],
  token: '',
  cgu: null,
  etablissements: [],
  message:''
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        userData: action.payload.dataUser,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        token: action.payload.token,
        headerMessage: action.payload.headermessage,
        headerError: action.payload.headererror,
        inputFields: action.payload.input,
        buttons: action.payload.buttonvalidation,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        headerMessage: action.payload.headermessage,
        headerError: action.payload.headererror,
        inputFields: action.payload.input,
        buttons: action.payload.buttonvalidation,
      };
    case STEP_REQUEST:
      return {
        ...state,
        session: action.payload.session,
        headerMessage: action.payload.headermessage,
        headerError: action.payload.headererror,
        inputFields: action.payload.input,
        buttons: action.payload.buttonvalidation,
        isLoading: false,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        session: '',
        failure:'',
        headerMessage: '',
        headerError: '',
        inputFields: [],
        buttons: [],
        token: '',
        cgu: ''
      }
    case SIGNUP_CHECK:
      return {
        ...state,
        isLoading: false,
        cgu: action.payload.cgu,
        etablissements: action.payload.etabs,
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        etablissements: [],
        cgu:null
      }
    case SIGNUP_FAILURE: 
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state;
  }
};

export default AuthReducer;
