
import {
  SET_MODAL_VISIBLE,
  SET_MODAL_VISIBLE_REQUEST
} from './types';

const initialState = {
  modalVisible: false,
  modalMessage: '',
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL_VISIBLE_REQUEST:
      return {
        ...state,
        modalVisible: false,
        modalMessage:  '',
      };
      case SET_MODAL_VISIBLE:
      return {
        ...state,
        modalVisible: action.payload.show,
        modalMessage: action.payload.message || '',
      };
    default:
      return state;
  }
};

export default AppReducer;
