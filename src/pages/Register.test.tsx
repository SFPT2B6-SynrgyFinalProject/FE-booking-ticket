import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as authModule from "../lib/services/auth";
import Register from "./Register";
import { BrowserRouter } from "react-router-dom";

jest.mock("../assets/images/logo.png", () => ({
  default: "mocked-logo-path",
}));

jest.mock("../assets/images/airplane-and-packages-1.png", () => ({
  default: "mocked-airplane-path",
}));

describe("Register Component", () => {
  test("handles form submission and shows success alert", async () => {
    // Spy on registerUserMock function
    const registerUserMock = jest.spyOn(authModule, "registerUser");
    registerUserMock.mockResolvedValue({
      status: "success",
    } as any);

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Full Name/i), {
      target: { value: "Full Name" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Masukan Password/i), {
      target: { value: "testPassword" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), {
      target: { value: "testPassword" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tanggal Lahir"), {
        target: { value: "2024-02-06" }, 
    });
    fireEvent.change(screen.getByRole("combobox", { name: "" }), {
  target: { value: "Laki-laki" },
});

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: /Register/i }));

    // Wait for the success alert
    await waitFor(() => {
      expect(screen.getByText(/Register berhasil, silahkan cek email Anda/i)).toBeInTheDocument();
    });

    // Verify that loginUser was called
      expect(registerUserMock).toHaveBeenCalledWith({
          email: "test@example.com",
          password: "testPassword",
          fullName: "Full Name",
          gender: "Laki-laki",
          birthDate: "2024-02-06T00:00:00.000Z",
      });

    // Clean up the spy
    registerUserMock.mockRestore();
  });

  // Add more test cases as needed
});
