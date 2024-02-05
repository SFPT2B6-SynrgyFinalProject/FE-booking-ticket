import { fetchInstance } from "../../../lib/services/core";
import { useUserToken } from "../../../lib/services/auth";
export interface IProfileData {
  fullName: string;
  email: string;
  birthDate: string | null; // Update type to Date | null
  gender: string | undefined;
  noHp: string | null;
}
export type ResetPasswordResponseBody =
  {
    data: null,
    message: string,
    status: string,
  }
export type ProfileResponseBody =
  {
    data: null,
    message: string,
    status: string,
  }
export interface IResetPassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export async function ResetPassword(form: IResetPassword): Promise<ResetPasswordResponseBody> {
  return await fetchInstance({
    endpoint: "/api/user/password",
    method: "PUT",
    authToken: useUserToken(),
    data: form,
  })
}
export async function editProfile(form: IProfileData): Promise<ProfileResponseBody> {
  return await fetchInstance({
    endpoint: "/api/user",
    method: "PUT",
    authToken: useUserToken(),
    data: form,
  })
}