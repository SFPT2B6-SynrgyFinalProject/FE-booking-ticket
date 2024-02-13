import {
  RegisterRequestBody,
  Gender,
  RegisterResponseBody,
  loginUser,
  LoginRequestBody,
  LoginResponseBody,
  loginGoogleUser,
  UserRequestGoogle,
  useUserToken,
  useUserRole,
  registerUser,
} from "./auth";

import { fetchInstance } from "./core";

// Mocking fetchInstance function
jest.mock("./core", () => ({
  fetchInstance: jest.fn(),
}));

describe("User Authentication Functions", () => {
  describe("registerUser", () => {
    test("should call fetchInstance with correct parameters for registration", async () => {
      const form: RegisterRequestBody = {
        email: "test@example.com",
        fullName: "John Doe",
        gender: "Laki-laki",
        birthDate: "1990-01-01",
        password: "password123",
      };

      const mockResponse: RegisterResponseBody = {
        data: {
          email: form.email,
          fullName: form.fullName,
          gender: Gender["Laki-laki"],
          birthDate: form.birthDate,
        },
        message: "Registration successful",
        status: "success",
      };

      (fetchInstance as jest.MockedFunction<typeof fetchInstance>).mockResolvedValueOnce(
        mockResponse
      );

      const result = await registerUser(form);

      expect(fetchInstance).toHaveBeenCalledWith({
        endpoint: "/api/register",
        method: "POST",
        data: form,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("loginUser", () => {
    test("should call fetchInstance with correct parameters for login", async () => {
      const form: LoginRequestBody = {
        email: "test@example.com",
        password: "password123",
      };

      const mockResponse: LoginResponseBody = {
        data: {
          email: form.email,
          password: form.password,
          authentication: "successful",
          token: "exampleToken",
          roles: "user",
        },
        status: "success",
      };

      (fetchInstance as jest.MockedFunction<typeof fetchInstance>).mockResolvedValueOnce(
        mockResponse
      );

      const result = await loginUser(form);

      expect(fetchInstance).toHaveBeenCalledWith({
        endpoint: "/api/login",
        method: "POST",
        data: form,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("loginGoogleUser", () => {
    test("should call fetchInstance with correct parameters for Google login", async () => {
      const form: UserRequestGoogle = {
        googleToken: "googleToken123",
      };

      const mockResponse: LoginResponseBody = {
        data: {
          email: "test@example.com",
          password: "",
          authentication: "successful",
          token: "exampleToken",
          roles: "user",
        },
        status: "success",
      };

      (fetchInstance as jest.MockedFunction<typeof fetchInstance>).mockResolvedValueOnce(
        mockResponse
      );

      const result = await loginGoogleUser(form);

      expect(fetchInstance).toHaveBeenCalledWith({
        endpoint: "/api/login/google",
        method: "POST",
        data: form,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("useUserToken", () => {
    test("should return user access token from local storage", () => {
      const mockToken = "exampleToken";
      localStorage.setItem("user_access_token", mockToken);

      expect(useUserToken()).toEqual(mockToken);
    });
  });

  describe("useUserRole", () => {
    test("should return user role from local storage", () => {
      const mockRole = "user";
      localStorage.setItem("user_role", mockRole);

      expect(useUserRole()).toEqual(mockRole);
    });
  });
});
