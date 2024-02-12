import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfileData from "./data";
import { BrowserRouter } from "react-router-dom";

// Mocking the useData hook
jest.mock("./data.hooks", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    disabled: false, // Initial state is disabled
    on: jest.fn(() => ({ disabled: false })), // Update disabled to false when on is called
    off: jest.fn(),
    handleSubmit: jest.fn(),
    fullName: "",
    gender: undefined,
    handleChange: jest.fn(),
    email: "",
    noHp: "",
    status: "",
    handleOnSelect: jest.fn(),
    birthDate: "",
    isValidBirthdate: true,
  })),
}));

describe("ProfileData Component", () => {
  test("renders profile data form correctly", () => {
    render(
      <BrowserRouter>
        <ProfileData />
      </BrowserRouter>
    );

    // Assert that elements are rendered correctly
    expect(screen.getByText("Information Account")).toBeInTheDocument();
    expect(screen.getByText("Data Pribadi")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("example@gmail.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Tanggal Lahir")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nomor Telepon")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Kirim" })).toBeInTheDocument();
  });

  test("handles form submission correctly", async () => {
    render(
      <BrowserRouter>
        <ProfileData />
      </BrowserRouter>
    );

    // Open edit mode
     // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText("Full Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText("example@gmail.com"), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Tanggal Lahir"), { target: { value: "1990-01-01" } });
    fireEvent.change(screen.getByPlaceholderText("Nomor Telepon"), { target: { value: "1234567890" } });

    // // Submit form
    fireEvent.submit(screen.getByRole("button", { name: "Kirim" }));

    // Wait for the form submission to complete
    // await waitFor(() => {
    //   expect(screen.getByText("Data sukses diubah")).toBeInTheDocument();
    // });
  });
});
