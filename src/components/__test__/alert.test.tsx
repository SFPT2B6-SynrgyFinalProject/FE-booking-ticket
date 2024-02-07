import { render } from '@testing-library/react';
import Alert from '../Alert';

describe('Alert', () => {
  test('renders success alert with message', () => {
    const message = 'Success message';
    const { getByText } = render(<Alert message={message} type="success" />);
    const alertElement = getByText(message);
    expect(alertElement).toBeTruthy();
  });

  test('renders fail alert with message and custom style', () => {
    const message = 'Fail message';
    const customStyle = 'custom-style';
    const { getByText } = render(
      <Alert message={message} type="fail" customStyle={customStyle} />
    );
    const alertElement = getByText(message);
    expect(alertElement).toBeTruthy();
  });


});