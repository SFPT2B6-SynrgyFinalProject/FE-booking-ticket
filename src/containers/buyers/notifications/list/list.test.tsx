import { render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import NotificationList from './list';
import { getNotifications } from '../notifications.types';

jest.mock("../../../../assets/images/undraw_fresh_notification.png", () => ({
    default: "mocked-notification-path",
}));

jest.mock('../notifications.types', () => ({
    getNotifications: jest.fn(),
}));

describe('Notification List Component', () => {
    test('renders loading spinner when loading data', async () => {
        (getNotifications as jest.Mock).mockResolvedValueOnce({ data: { notification: [] } });

        render(<NotificationList />);
        expect(screen.getByRole('status')).toBeInTheDocument();
        expect(screen.queryByText('Tidak ada notifikasi')).toBeNull();

        await waitFor(() => {
            expect(getNotifications).toHaveBeenCalledTimes(1);
        });
    });

    test('renders no notification message when no notifications are available', async () => {
        (getNotifications as jest.Mock).mockResolvedValueOnce({ data: { notification: [] } });

        render(<NotificationList />);

        await waitFor(() => {
            expect(screen.getByText('Tidak ada notifikasi')).toBeInTheDocument();
        });
    });

    test('renders notifications when notifications are available', async () => {
        const notifications = [
            { id: 1, content: 'Notification 1' },
            { id: 2, content: 'Notification 2' },
        ];
        (getNotifications as jest.Mock).mockResolvedValueOnce({ data: { notification: notifications } });

        render(<NotificationList />);

        await waitFor(() => {
            expect(screen.getByText('Notification 1')).toBeInTheDocument();
            expect(screen.getByText('Notification 2')).toBeInTheDocument();
        });
    });
});
