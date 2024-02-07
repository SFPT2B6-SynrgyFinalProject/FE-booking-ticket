import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as authModule from "../lib/services/auth";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";

jest.mock("../assets/images/logo.png", () => ({
  default: "mocked-logo-path",
}));

jest.mock("../assets/images/airplane-and-packages-1.png", () => ({
  default: "mocked-airplane-path",
}));



describe("Login Component", () => {
  test("handles form submission and shows success alert", async () => {
    // Spy on loginUser function
    const loginUserMock = jest.spyOn(authModule, "loginUser");
    loginUserMock.mockResolvedValue({
      status: "success",
      data: {
        token: "mockToken",
        roles: ["user"],
      },
    } as any);
    

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "testPassword" },
    });

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: /Log in/i }));

    // Wait for the success alert
    await waitFor(() => {
      expect(screen.getByText(/Login berhasil/i)).toBeInTheDocument();
    });

    // Verify that loginUser was called
    expect(loginUserMock).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "testPassword",
    });

    loginUserMock.mockRestore();
  });
});

describe("Login Component", () => {
  test("handles form submission and shows error alert", async () => {
    // Spy on loginUser function
    const loginUserMock = jest.spyOn(authModule, "loginUser");
    loginUserMock.mockResolvedValue({
      status: "fail",
      data: {
        email: "You have not registered using this email",
      },
    } as any);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
      target: { value: "kudesigned@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "kudesigned" },
    });

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: /Log in/i }));

    // Wait for the success alert
    await waitFor(() => {
      expect(screen.getByText(/You have not registered using this email/i)).toBeInTheDocument();
    });

    // Verify that loginUser was called
    expect(loginUserMock).toHaveBeenCalledWith({
      email: "kudesigned@example.com",
      password: "kudesigned",
    });

    loginUserMock.mockRestore();
  });
});

