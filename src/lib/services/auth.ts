import { fetchInstance } from "./core";

enum Gender {
  "Perempuan",
  "Laki-laki",
}

export interface IAlert {
  type?: string;
  data: Record<string, string>;
  message?: string;
}

export type RegisterRequestBody = {
  email: string;
  fullName: string;
  gender: string;
  birthDate: string;
  password: string;
};

export type RegisterResponseBody = {
  data: {
    email: string;
    fullName: string;
    gender: Gender;
    birthDate: string;
  };
  message: string;
  status: string;
};

export type LoginRequestBody = {
  email: string;
  password: string;
}

export interface LoginResponseBody {
    data:{
    email: string;
    password: string;
    authentication: string;
    token: string;
  };
  status: string;
}

export interface UserRequestGoogle {
  googleToken: string;
}

export async function registerUser(
  form: RegisterRequestBody
): Promise<RegisterResponseBody> {
  return await fetchInstance({
    endpoint: "/api/register",
    method: "POST",
    data: form,
  });
}

export async function loginUser(
  form: LoginRequestBody
): Promise<LoginResponseBody> {
  return await fetchInstance({
    endpoint: "/api/login",
    method: "POST",
    data: form
  })
}

export async function loginGoogleUser(
  form: UserRequestGoogle
  ): Promise<LoginResponseBody> {
    return await fetchInstance({
      endpoint: "/api/login/google",
      method: "POST",
      data: form
    })
  }