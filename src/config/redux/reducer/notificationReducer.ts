import { ADD_NOTIFICATION_ORDER_ID, REMOVE_NOTIFICATION_ORDER_IDS } from '../action/notificationAction';

const initialState = {
  orderCount: 0 as number,
};

export const notificationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_NOTIFICATION_ORDER_ID:
      return {
        ...state,
        orderCount: state.orderCount +1,
      };
    case REMOVE_NOTIFICATION_ORDER_IDS:
      return {
        ...state,
        orderCount: 0,
      };
    default:
      return state;
  }
};
