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

    // Wait for the error alert
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

describe("Succes Login Component", () => {
  test("handles form submission and shows error alert", async () => {
    // Spy on loginUser function
    const loginUserMock = jest.spyOn(authModule, "loginUser");
    loginUserMock.mockResolvedValue({
      status: "success",
      data: {
        email: "Login berhasil!",
      },
    } as any);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
      target: { value: "wingson222@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password" },
    });

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: /Log in/i }));

    

    // Verify that loginUser was called
    expect(loginUserMock).toHaveBeenCalledWith({
      email: "wingson222@gmail.com",
      password: "password",
    });

    loginUserMock.mockRestore();
  });
});
