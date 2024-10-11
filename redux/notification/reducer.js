import {
  LIST_NOTIFICATION_FAILURE,
  LIST_NOTIFICATION_REQUEST,
  LIST_NOTIFICATION_SUCCESS,
  SUBSCRIBE_NOTIFICATION_FAILURE,
  SUBSCRIBE_NOTIFICATION_REQUEST,
  SUBSCRIBE_NOTIFICATION_SUCCESS,
  UNSUBSCRIBE_NOTIFICATION_FAILURE,
  UNSUBSCRIBE_NOTIFICATION_REQUEST,
  UNSUBSCRIBE_NOTIFICATION_SUCCESS
} from './types';

const initialState = {
  isLoading: false,
  list: [], 
  error: null,
  isSubscribed: false, 
  page: 1,
  maxpage: 1,
};

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_NOTIFICATION_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        page: action.page || 1, // Utiliser la page demandée ou revenir à la première page
      };
    case LIST_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: state.page === 1 ? action.payload.list : [...state.list, ...action.payload.list],
        maxpage: action.payload.pagination.maxpage,
      };
    case SUBSCRIBE_NOTIFICATION_REQUEST:
    case UNSUBSCRIBE_NOTIFICATION_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case SUBSCRIBE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSubscribed: true
      };
    case UNSUBSCRIBE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSubscribed: false
      };
    case LIST_NOTIFICATION_FAILURE:
    case SUBSCRIBE_NOTIFICATION_FAILURE:
    case UNSUBSCRIBE_NOTIFICATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default NotificationReducer;
