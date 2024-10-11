 import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  RESULT_REQUEST,
  RESULT_SUCCESS,
  RESULT_FAILURE,
  INFO_DOCTOR_REQUEST,
  INFO_DOCTOR_SUCCESS,
  INFO_DOCTOR_FAILURE
} from './types';

const initialState = {
  isLoading: false,
  isPaginating: false,
  results: [],
  searchInfo: null,
  error: null,
  doctorInfos: null,
  page: 1,
  maxpage: 1
};

const SearchReducer = (state = initialState, action) => {
  switch (action.type) {

    case SEARCH_REQUEST:
      return {
        ...state,
        results:[],
        isLoading: true,
        page: 1, 
        maxpage: 1,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        results:action.payload.list,
        page: 1,
        maxpage: action.payload.maxpage,
        searchInfo: action.payload.search,
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        results:[],
        error:action.payload
      };
      case RESULT_REQUEST:
        return {
          ...state,
          isLoading: state.page === 1,
          isPaginating: state.page !== 1,
        };
      case RESULT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isPaginating: false,
          results: state.page === 1 ? action.payload.list : [...state.results, ...action.payload.list],
          page: action.payload.pagination.current,
          maxpage: action.payload.pagination.maxpage,
          searchInfo: action.payload.search,
        };
      case RESULT_FAILURE:
        return {
          ...state,
          isLoading: false,
          isPaginating: false,
          results:[],
          error:action.payload
        };
        case INFO_DOCTOR_REQUEST:
          return {
            ...state,
            isLoading: true,
          };
        case INFO_DOCTOR_SUCCESS:
          return {
            ...state,
            isLoading: false,
            doctorInfos:action.payload.data,
          };
        case INFO_DOCTOR_FAILURE:
          return {
            ...state,
            isLoading: false,
            doctorInfos:null,
            error:action.payload
          };
    default:
      return state;
  }
};

export default SearchReducer;
