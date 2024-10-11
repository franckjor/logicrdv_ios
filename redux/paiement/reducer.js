
import {
  MAKE_PAIEMENT_REQUEST,
  MAKE_PAIEMENT_SUCCESS,
  MAKE_PAIEMENT_FAILURE
} from './types';

const initialState = {
  isLoading: false,
  isPay:false,
  paiement: '',

};

const PaimentReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_PAIEMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isPay:false,
        paiement:''
      };
    case MAKE_PAIEMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        paiement: action.payload,
        isPay:true
      };
    case MAKE_PAIEMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isPay:false,
        paiement: ''
      };
    default:
      return state;
  }
};

export default PaimentReducer;
