import { combineReducers } from 'redux';
import AuthReducer from '../auth/reducer';
import SearchReducer from '../search/reducer';
import AppointmentReducer from '../appointment/reducer';
import NotificationReducer from '../notification/reducer';
import AppReducer from '../app/reducer';
import PaimentReducer from '../paiement/reducer';
import SettingReducer from '../setting/reducer';
import MessageReducer from '../document/reducers';
const reducerCombination = combineReducers({
  AuthReducer,
  SearchReducer,
  AppointmentReducer,
  NotificationReducer,
  AppReducer,
  PaimentReducer, 
  SettingReducer,
  MessageReducer
});

export default reducerCombination;
