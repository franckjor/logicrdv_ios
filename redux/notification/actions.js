import * as types from './types';

export const listNotificationsRequest = (page = 1) => ({
  type: types.LIST_NOTIFICATION_REQUEST,
  page,
});

export const manageNotificationRequest = (subscribe) => ({
  type: subscribe ? types.SUBSCRIBE_NOTIFICATION_REQUEST : types.UNSUBSCRIBE_NOTIFICATION_REQUEST,
  payload: subscribe
});
