import { render } from '@testing-library/react';
import Badge from '../Badges';

describe('Badge', () => {
    test('renders success badge with message', () => {
        const message = 'Success message';
        const { getByText } = render(<Badge message={message} type="success" />);
        const badgeElement = getByText(message);
        expect(badgeElement).toBeTruthy();
        expect(badgeElement.className).toContain('bg-green-500');
    });

    test('renders fail badge with message', () => {
        const message = 'Fail message';
        const { getByText } = render(<Badge message={message} type="fail" />);
        const badgeElement = getByText(message);
        expect(badgeElement).toBeTruthy();
        expect(badgeElement.className).toContain('bg-red-500');
    });
    
    test('renders fail badge with message', () => {
        const message = 'Fail message';
        const { getByText } = render(<Badge message={message} type="tertunda" />);
        const badgeElement = getByText(message);
        expect(badgeElement).toBeTruthy();
        expect(badgeElement.className).toContain('bg-yellow-500');
    });


    // Add more tests for other types (pending, tertunda, dibatalkan, tepat waktu) if needed
});
