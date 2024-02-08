import { render } from "@testing-library/react";
import Alert from "../Alert";

describe("Alert", () => {
  test("renders success alert with message", () => {
    const message = "Success message";
    const { getByText } = render(<Alert message={message} type="success" />);
    const alertElement = getByText(message);
    expect(alertElement).toBeTruthy();
  });

  test("renders fail alert with message", () => {
    const message = "Fail message";
    const { getByText } = render(<Alert message={message} type="fail" />);
    const alertElement = getByText(message);
    expect(alertElement).toBeTruthy();
  });

  test("renders process alert with message", () => {
    const message = "Process message";
    const { getByText } = render(<Alert message={message} type="process" />);
    const alertElement = getByText(message);
    expect(alertElement).toBeTruthy();
  });
});
