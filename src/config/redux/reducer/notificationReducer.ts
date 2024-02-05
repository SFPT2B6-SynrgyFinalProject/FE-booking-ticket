import { PayloadAction } from '@reduxjs/toolkit';
import { INotifications } from '../../../containers/buyers/notifications/notifications.types';

export interface NotificationState {
    notifications: INotifications[];
}

const initialState: NotificationState = {
    notifications: [],
};

export const notificationReducer = (state = initialState, action: PayloadAction<INotifications[]>) => {
    if (action.type === "GET_NOTIFICATIONS") {
        return {
            ...state,
            notifications: action.payload,
        };
    }
    return state;
};
