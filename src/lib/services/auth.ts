import { fetchInstance } from "./core";

enum Gender {
  "Perempuan",
  "Laki-laki",
}

export type RegisterRequestBody = {
  email: string;
  fullName: string;
  gender: "Perempuan" | "Laki-laki";
  birthDate: string;
  password: string;
};

export type RegisterResponseBody = {
  data?: {
    email: string;
    fullName: string;
    gender: Gender;
    birthDate: string;
  };
  message: string;
  status: string;
};

export async function registerUser(
  form: RegisterRequestBody
): Promise<RegisterResponseBody> {
  return await fetchInstance({
    endpoint: "/api/register",
    method: "POST",
    data: form,
  });
}
