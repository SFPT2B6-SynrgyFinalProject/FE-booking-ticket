import { fetchInstance } from "./core";

export interface UserToken {
  token: string;
}

export interface UserResponse {
  data: {
    gender: string,
    fullName: string,
    noHp: string,
    birthDate: string,
    email: string,
  },
  status: string
}

export async function userData(
  form: UserToken
): Promise<UserResponse> {
  return await fetchInstance({
    endpoint: "/api/user",
    method: "GET",
    authToken: form.token
  })
}