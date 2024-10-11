import { takeLatest, call, put, select } from 'redux-saga/effects';
import { sendRequest } from '../../utils/api';
import { getUserData, getInstallationId, setIsSubscribeNotification } from "../../utils/helpers";
import WonderPush from 'react-native-wonderpush';
import { showMessage } from 'react-native-flash-message';
import {
  SUBSCRIBE_NOTIFICATION_REQUEST,
  SUBSCRIBE_NOTIFICATION_SUCCESS,
  SUBSCRIBE_NOTIFICATION_FAILURE,
  UNSUBSCRIBE_NOTIFICATION_REQUEST,
  UNSUBSCRIBE_NOTIFICATION_SUCCESS,
  UNSUBSCRIBE_NOTIFICATION_FAILURE,
  LIST_NOTIFICATION_REQUEST,
  LIST_NOTIFICATION_SUCCESS,
  LIST_NOTIFICATION_FAILURE
} from './types';

function* list({ page }) {
  try {
    const endpoint = 'notification/list/';
    const userData = yield getUserData();
    const installationkey = yield getInstallationId();
    const body = userData?.tokenuser ? { "tokenuser": userData?.tokenuser, "installationkey": installationkey, "page": page } : { "installationkey": installationkey, "page": page };
    const response = yield call(sendRequest, 'POST', endpoint, body);
    yield put({ type: LIST_NOTIFICATION_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: LIST_NOTIFICATION_FAILURE, payload: error });
  }
}

function* manageNotifications({ payload }) {
  try {
    const endpoint = payload === true ? 'notification/subscribe/' : 'notification/unsubscribe/';
    const userData = yield getUserData();
    const installationkey = yield getInstallationId();
    const body = { "tokenuser": userData?.tokenuser, "installationkey": installationkey };
    const response = yield call(sendRequest, 'POST', endpoint, body);

    if (response.httpstatut == 404) {
      showMessage({
        message: 'Souscrire aux notifications',
        description: `Pour recevoir des notifications, veuillez activer les notifications dans les paramètres de l'application.`,
        type: 'info',
        duration: 3500,
      });
    }

    if (response?.message === "Notification Activée") {
      yield WonderPush.subscribeToNotifications();
      yield setIsSubscribeNotification(true);
      showMessage({
        message: 'Notifications activées',
        description: `Vous recevrez désormais des notifications.`,
        type: 'success',
        duration: 3500,
      });
    } else {
      yield WonderPush.unsubscribeFromNotifications();
      yield setIsSubscribeNotification(false);
      showMessage({
        message: 'Notifications désactivées',
        description: `Vous ne recevrez plus de notifications.`,
        type: 'info',
        duration: 3500,
      });
    }

    yield put({ type: LIST_NOTIFICATION_REQUEST, page: 1 }); // Revenir à la première page après une modification de l'abonnement
  } catch (error) {
    const failureType = payload === true ? SUBSCRIBE_NOTIFICATION_FAILURE : UNSUBSCRIBE_NOTIFICATION_FAILURE;
    yield put({ type: failureType, payload: error });
  }
}

function* NotificationSaga() {
  yield takeLatest(SUBSCRIBE_NOTIFICATION_REQUEST, manageNotifications);
  yield takeLatest(UNSUBSCRIBE_NOTIFICATION_REQUEST, manageNotifications);
  yield takeLatest(LIST_NOTIFICATION_REQUEST, list);
}

export default NotificationSaga;
