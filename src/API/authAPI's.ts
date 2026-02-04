import instance from "../utils/interceptor";

/* ================= REGISTER & LOGIN ================= */

export async function RegisterApi(data) {
  const responseData = await instance.post("api/auth/register", data);
  return responseData;
}

export async function LoginApi(data) {
  const responseData = await instance.post("api/auth/login", data);
  return responseData;
}

export async function LogoutApi(data) {
  const responseData = await instance.post("api/auth/logout", data);
  return responseData;
}

/* ================= FORGOT PASSWORD ================= */

export async function ForgotPasswordApi(data) {
  const responseData = await instance.post("api/auth/forgot-password", data);
  return responseData;
}

export async function VerifyForgotOtpApi(data) {
  const responseData = await instance.post("api/auth/verify-forgot-otp", data);
  return responseData;
}

export async function ResetPasswordApi(data) {
  const responseData = await instance.post("api/auth/reset-password", data);
  return responseData;
}

/* ================= OTP LOGIN ================= */

export async function LoginOtpRequestApi(data) {
  const responseData = await instance.post("api/auth/login-otp/request", data);
  return responseData;
}

export async function LoginOtpVerifyApi(data) {
  const responseData = await instance.post("api/auth/login-otp/verify", data);
  return responseData;
}

/* ================= PHARMACY SETUP ================= */

export async function PharmacySetupApi(formData) {
  const responseData = await instance.post(
    "api/auth/pharmacy-setup",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return responseData;
}
