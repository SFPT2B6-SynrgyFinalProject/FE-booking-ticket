export const ADD_NOTIFICATION_ORDER_ID = 'ADD_NOTIFICATION_ORDER_ID';
export const REMOVE_NOTIFICATION_ORDER_IDS = 'REMOVE_NOTIFICATION_ORDER_IDS';

export const addNotificationOrderId = () => {
  return {
    type: ADD_NOTIFICATION_ORDER_ID,
  };
};

export const removeNotificationOrderIds = () => {
  return {
    type: REMOVE_NOTIFICATION_ORDER_IDS,
  };
};

