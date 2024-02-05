import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";
// import Logo from "../assets/images/logo.png";

jest.mock("../assets/images/logo.png", () => ({
  default: "mocked-logo-path",
}));

describe("Login Component", () => {
  test("renders Login component correctly", () => {
    render(<Login />);

    // You can add more assertions based on your component's structure
    expect(screen.getByText(/Log In into your account/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Log in/i)).toBeInTheDocument();
  });

  test("handles form submission and shows success alert", async () => {
    render(<Login />);

    // Mock loginUser function
    jest.mock("../lib/services/auth", () => ({
      loginUser: jest.fn(() => ({
        status: "success",
        data: {
          token: "mockToken",
          roles: ["user"],
        },
      })),
    }));

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
  });

  // Add more test cases as needed
});
