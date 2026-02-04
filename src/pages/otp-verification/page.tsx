import OTPInput from "@/CommonComponents/OTPInput";
import { useState, useEffect } from "react";

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter complete 6-digit OTP");
      return;
    }

    setError("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (window.REACT_APP_NAVIGATE) window.REACT_APP_NAVIGATE("/");
    }, 1500);
  };

  const handleResend = () => {
    if (!canResend) return;

    setOtp(["", "", "", "", "", ""]);
    setError("");
    setResendTimer(30);
    setCanResend(false);

    const successMsg = document.createElement("div");
    successMsg.className =
      "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2";
    successMsg.innerHTML =
      '<i class="ri-check-line"></i><span>OTP sent successfully!</span>';
    document.body.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 3000);
  };

  const handleBackToSignup = () => {
    if (window.REACT_APP_NAVIGATE) window.REACT_APP_NAVIGATE("/signup");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <i className="ri-capsule-line text-2xl text-white"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dose Plus</h1>
            <p className="text-sm text-gray-600">Pharmacy Software</p>
          </div>
        </div>

        {/* OTP Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
              <i className="ri-smartphone-line text-4xl text-orange-500"></i>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Verify Your Mobile Number
            </h2>
            <p className="text-sm text-gray-600">
              OTP sent to{" "}
              <span className="font-semibold text-gray-800">+91 XXXXXXXX</span>
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <i className="ri-error-warning-line text-red-500 text-lg mt-0.5"></i>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="mb-8">
            <OTPInput value={otp} onChange={setOtp} error={error} />
            <p className="text-xs text-gray-500 text-center mt-2">
              Enter the 6-digit code
            </p>
          </div>

          <button
            onClick={handleVerify}
            disabled={isLoading || otp.join("").length !== 6}
            className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {isLoading ? (
              <>
                <i className="ri-loader-4-line animate-spin"></i>
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <i className="ri-check-line"></i>
                <span>Verify OTP</span>
              </>
            )}
          </button>

          <div className="text-center">
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-sm text-orange-500 hover:text-orange-600 font-semibold cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
              >
                <i className="ri-refresh-line"></i>
                <span>Resend OTP</span>
              </button>
            ) : (
              <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                <i className="ri-time-line text-gray-400"></i>
                <span>
                  Resend OTP in{" "}
                  <span className="font-semibold text-orange-500">{resendTimer}s</span>
                </span>
              </p>
            )}
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleBackToSignup}
              className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
            >
              <i className="ri-arrow-left-line"></i>
              <span>Back to Registration</span>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Didn't receive the code?{" "}
            <button className="text-orange-500 hover:underline cursor-pointer whitespace-nowrap">
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
