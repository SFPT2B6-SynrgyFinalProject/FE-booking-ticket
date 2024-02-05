import { INotifications } from '../../../containers/buyers/notifications/notifications.types';

export const setNotifications = (payload: INotifications[]) => {
    return {
        type: 'GET_NOTIFICATIONS',
        payload: payload
    };
};