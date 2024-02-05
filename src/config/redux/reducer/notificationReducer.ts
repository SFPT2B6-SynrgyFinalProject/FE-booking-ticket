import { PayloadAction } from '@reduxjs/toolkit';
import { INotifications } from '../../../containers/buyers/notifications/notifications.types';

export interface NotificationState {
    notifications: INotifications[]; // Menyimpan data notifikasi
}

const initialState: NotificationState = {
    notifications: [], // Inisialisasi dengan array kosong
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
