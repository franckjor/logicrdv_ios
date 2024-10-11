import {
  UNSUBSCRIBE_ACCOUNT_FAILURE,
  UNSUBSCRIBE_ACCOUNT_REQUEST,
  UNSUBSCRIBE_ACCOUNT_SUCCESS,
  INFORMATION_ACCOUNT_FAILURE,
  INFORMATION_ACCOUNT_REQUEST,
  INFORMATION_ACCOUNT_SUCCESS,
} from './types';

const initialState = {
  isLoading: false,
  message: '',
  error: null,
  isSubscribed: false
};

const SettingReducer = (state = initialState, action) => {
  switch (action.type) {
    case INFORMATION_ACCOUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: '',
        error: null
      };
    case INFORMATION_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message
      };
    case INFORMATION_ACCOUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: '',
      };
      case UNSUBSCRIBE_ACCOUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: '',
        error: null
      };
    case UNSUBSCRIBE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message
      };
    case UNSUBSCRIBE_ACCOUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: '',
      };
    default:
      return state;
  }
};

export default SettingReducer;
