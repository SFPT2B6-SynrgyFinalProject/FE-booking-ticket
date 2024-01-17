import { fetchInstance } from "./core";

export type ForgotEmailRequestBody = {
    email: string;
};



export type ForgotPasswordResponseBody = {
    data?: {
        email: string;
    };
    message: string;
    status: string;
};


export async function SendPasswordResetLink(
    form: ForgotEmailRequestBody
): Promise<ForgotPasswordResponseBody> {
    return await fetchInstance({
        endpoint: "/api/forget-password",
        method: "POST",
        data: form,
    });
}


