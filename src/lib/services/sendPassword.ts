import { fetchInstance } from "./core";

export type ResetPasswordRequestBody = {
    newPassword: string;
    otp: string;
};

export type ResetPasswordResponseBody = {
    data?: {
        email: string;
        token: string;
    };
    status: string;
};

export async function ResetNewPassword(
    form: ResetPasswordRequestBody
): Promise<ResetPasswordResponseBody> {
    return await fetchInstance({
        endpoint: "/api/forget-password/reset-password",
        method: "POST",
        data: form,
    });
}