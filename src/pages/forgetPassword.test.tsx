import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as SendEmailReset from "../lib/services/password";
import ForgetPassword from "./ForgetPassword";
import { BrowserRouter } from "react-router-dom";

jest.mock("../assets/images/logo.png", () => ({
  default: "mocked-logo-path",
}));

jest.mock("../assets/images/airplane-and-packages-1.png", () => ({
  default: "mocked-airplane-path",
}));

describe("Send Email for Reset Password", () => {
  test("handles form submission and shows success alert", async () => {
    // Spy on loginUser function
    const ResetEmailPasswordMock = jest.spyOn(SendEmailReset, "SendPasswordResetLink");
    ResetEmailPasswordMock.mockResolvedValue({
      status: "success",
      data: {
        email: "achmadusufalmaruf@gmail.com"
      },
    } as any);

    render(
      <BrowserRouter>
        <ForgetPassword />
      </BrowserRouter>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
      target: { value: "achmadusufalmaruf@gmail.com" },
    });

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: /Reset Password/i }));

    // Wait for the success alert
    await waitFor(() => {
      expect(screen.getByText(/Please check your email to reset your password./i)).toBeInTheDocument();
    });

    // Verify that loginUser was called
    expect(ResetEmailPasswordMock).toHaveBeenCalledWith({
      email: "achmadusufalmaruf@gmail.com",
    });

    // Clean up the spy
    ResetEmailPasswordMock.mockRestore();
  });

  // Add more test cases as needed
});
