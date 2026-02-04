import { useState } from "react";
import OTPInput from "@/CommonComponents/OTPInput"; // Your reusable OTP component
import InputField from "@/CommonComponents/InputField";

interface FormData {
  pharmacyName: string;
  ownerName: string;
  mobile: string;
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const [formData, setFormData] = useState<FormData>({
    pharmacyName: "",
    ownerName: "",
    mobile: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Validation for Step 1
  const validateStep1 = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.pharmacyName.trim()) newErrors.pharmacyName = "pharmacyName is Required";
    if (!formData.ownerName.trim()) newErrors.ownerName = "ownerName is Required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile Number is Required";
    else if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter 10-digit mobile number";
    if (!formData.email.trim()) newErrors.email = "email is Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation for Step 2 (OTP)
  const validateStep2 = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (formData.otp.length !== 6) newErrors.otp = "Enter 6-digit OTP";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation for Step 3 (Account Setup)
  const validateStep3 = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.password) newErrors.password = "Password required";
    else if (formData.password.length < 8)
      newErrors.password = "Minimum 8 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) setCurrentStep(2);
    else if (currentStep === 2 && validateStep2()) setCurrentStep(3);
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep3()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        if (window.REACT_APP_NAVIGATE)
          window.REACT_APP_NAVIGATE("/otp-verification");
      }, 1500);
    }
  };

  const handleBackToLogin = () => {
    if (window.REACT_APP_NAVIGATE) window.REACT_APP_NAVIGATE("/login");
  };

  const stepContent = [
    {
      heading: "Create Your Account",
      subtext: "Register your pharmacy to get started",
    },
    {
      heading: "OTP Verification",
      subtext: "Enter the OTP sent to your mobile",
    },
    {
      heading: "Account Setup",
      subtext: "Set a password to secure your account",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
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

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {stepContent[currentStep - 1].heading}
            </h2>
            <p className="text-sm text-gray-600">
              {stepContent[currentStep - 1].subtext}
            </p>
          </div>

          {/* Step Indicators */}

          <div className="mb-8 flex items-center justify-between">
            {["Pharmacy Details", "OTP Verification", "Account Setup"].map(
              (label, index) => {
                const step = index + 1;
                const isCompleted = currentStep > step;
                const isActive = currentStep === step;

                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center relative"
                  >
                    {/* Step Circle */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isActive
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isCompleted ? (
                        <i className="ri-check-line text-lg"></i>
                      ) : (
                        step
                      )}
                    </div>

                    {/* Step Label */}
                    <p className="text-sm font-semibold text-gray-800 mt-2 text-center">
                      {label}
                    </p>

                    {/* Step Subtext */}
                    <p className="text-xs text-gray-500 text-center">
                      {step === 1 && "Basic information"}
                      {step === 2 && "Verify OTP sent to mobile"}
                      {step === 3 && "Set your account password"}
                    </p>

                    {/* Small connecting line */}
                    {step < 3 && (
                      <div className="absolute top-5 right-0 w-8 h-0.5 bg-gray-200">
                        {currentStep > step && (
                          <div className="w-full h-full bg-orange-500"></div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Step 1: Pharmacy Details */}
            {currentStep === 1 && (
              <>
                <InputField
                  label="Pharmacy Name"
                  placeholder="Enter pharmacy name"
                  value={formData.pharmacyName}
                  icon={<i className="ri-store-2-line text-lg"></i>}
                  error={errors.pharmacyName}
                  onChange={(val) => handleInputChange("pharmacyName", val)}
                />
                <InputField
                  label="Owner Name"
                  placeholder="Enter owner name"
                  value={formData.ownerName}
                  icon={<i className="ri-user-line text-lg"></i>}
                  error={errors.ownerName}
                  onChange={(val) => handleInputChange("ownerName", val)}
                />
                <InputField
                  label="Mobile Number"
                  placeholder="Enter 10-digit mobile number"
                  value={formData.mobile}
                  icon={<i className="ri-smartphone-line text-lg"></i>}
                  error={errors.mobile}
                  onChange={(val) =>
                    handleInputChange(
                      "mobile",
                      val.replace(/\D/g, "").slice(0, 10)
                    )
                  }
                />
                <InputField
                  label="Email Address"
                  placeholder="Enter email address"
                  type="email"
                  value={formData.email}
                  icon={<i className="ri-mail-line text-lg"></i>}
                  error={errors.email}
                  onChange={(val) => handleInputChange("email", val)}
                />

                {/* Navigation Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    className="flex-1 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <i className="ri-arrow-left-line"></i>
                    Back to Login
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                  >
                    Continue
                    <i className="ri-arrow-right-line"></i>
                  </button>
                </div>
              </>
            )}

            {/* Step 2: OTP Verification */}
            {currentStep === 2 && (
              <>
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600">
                    OTP sent to{" "}
                    <span className="font-semibold text-gray-800">
                      +91 {formData.mobile}
                    </span>
                  </p>
                </div>

                <OTPInput
                  value={formData.otp}
                  onChange={(val) => handleInputChange("otp", val)}
                  error={errors.otp}
                />

                {/* Navigation Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <i className="ri-arrow-left-line"></i>
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                  >
                    Continue
                    <i className="ri-arrow-right-line"></i>
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Account Setup */}
            {currentStep === 3 && (
              <>
                {/* Password */}
                <InputField
                  label="Password"
                  placeholder="Create a strong password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  icon={<i className="ri-lock-line text-lg"></i>}
                  error={errors.password}
                  onChange={(val) => handleInputChange("password", val)}
                  required={true} 
                  showValue={showPassword}
                  setShowValue={setShowPassword}
                />

                {/* Confirm Password */}
                <InputField
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  icon={<i className="ri-lock-line text-lg"></i>}
                  error={errors.confirmPassword}
                  onChange={(val) => handleInputChange("confirmPassword", val)}
                  showToggle={true}
                  showValue={showConfirmPassword}
                  setShowValue={setShowConfirmPassword}
                />

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <i className="ri-arrow-left-line"></i>
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <i className="ri-loader-4-line animate-spin"></i>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <i className="ri-check-line"></i>
                        Create Account
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={handleBackToLogin}
                className="text-orange-500 hover:text-orange-600 font-semibold cursor-pointer whitespace-nowrap"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{" "}
            <button className="text-orange-500 hover:underline cursor-pointer whitespace-nowrap">
              Terms of Service
            </button>{" "}
            and{" "}
            <button className="text-orange-500 hover:underline cursor-pointer whitespace-nowrap">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
