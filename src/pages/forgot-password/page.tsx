import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useState<(HTMLInputElement | null)[]>([null, null, null, null, null, null])[0];

  // Timer countdown
  useState(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  });

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!contact.trim()) {
      setError('Please enter your email or mobile number');
      return;
    }

    setIsLoading(true);

    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      setResendTimer(30);
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2';
      successMsg.innerHTML = '&lt;i class="ri-check-line"&gt;&lt;/i&gt;&lt;span&gt;OTP sent successfully!&lt;/span&gt;';
      document.body.appendChild(successMsg);
      setTimeout(() => successMsg.remove(), 3000);
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1]?.focus();
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setError('Please enter complete 6-digit OTP');
      return;
    }

    if (!newPassword) {
      setError('Please enter new password');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2';
      successMsg.innerHTML = '&lt;i class="ri-check-line"&gt;&lt;/i&gt;&lt;span&gt;Password reset successfully!&lt;/span&gt;';
      document.body.appendChild(successMsg);
      
      setTimeout(() => {
        successMsg.remove();
        if (window.REACT_APP_NAVIGATE) {
          window.REACT_APP_NAVIGATE('/login');
        }
      }, 2000);
    }, 1500);
  };

  const handleResendOTP = () => {
    if (resendTimer > 0) return;

    setOtp(['', '', '', '', '', '']);
    setError('');
    setResendTimer(30);
    inputRefs[0]?.focus();

    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2';
    successMsg.innerHTML = '&lt;i class="ri-check-line"&gt;&lt;/i&gt;&lt;span&gt;OTP sent successfully!&lt;/span&gt;';
    document.body.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 3000);
  };

  const handleBackToLogin = () => {
    if (window.REACT_APP_NAVIGATE) {
      window.REACT_APP_NAVIGATE('/login');
    }
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

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {step === 1 ? (
            <>
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                  <i className="ri-lock-password-line text-4xl text-orange-500"></i>
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
                <p className="text-sm text-gray-600">
                  Enter your registered email or mobile number to receive OTP
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <i className="ri-error-warning-line text-red-500 text-lg mt-0.5"></i>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSendOTP} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email or Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                      <i className="ri-user-line text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="Enter email or mobile number"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin"></i>
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-line"></i>
                      <span>Send OTP</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
              </div>

              {/* Back to Login */}
              <div className="text-center">
                <button
                  onClick={handleBackToLogin}
                  className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <i className="ri-arrow-left-line"></i>
                  <span>Back to Login</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                  <i className="ri-shield-keyhole-line text-4xl text-orange-500"></i>
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h2>
                <p className="text-sm text-gray-600">
                  OTP sent to <span className="font-semibold text-gray-800">{contact}</span>
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <i className="ri-error-warning-line text-red-500 text-lg mt-0.5"></i>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleResetPassword} className="space-y-6">
                {/* OTP Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Enter OTP
                  </label>
                  <div className="flex justify-center gap-2 mb-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className={`w-11 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                          error
                            ? 'border-red-300 bg-red-50'
                            : digit
                            ? 'border-orange-500 bg-orange-50 text-orange-600'
                            : 'border-gray-300 bg-white text-gray-800'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Resend OTP */}
                  <div className="text-center mt-3">
                    {resendTimer > 0 ? (
                      <p className="text-xs text-gray-600 flex items-center justify-center gap-2">
                        <i className="ri-time-line text-gray-400"></i>
                        <span>
                          Resend in <span className="font-semibold text-orange-500">{resendTimer}s</span>
                        </span>
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        className="text-xs text-orange-500 hover:text-orange-600 font-semibold cursor-pointer whitespace-nowrap flex items-center justify-center gap-1"
                      >
                        <i className="ri-refresh-line"></i>
                        <span>Resend OTP</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                      <i className="ri-lock-line text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <i className={`${showNewPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-lg`}></i>
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                      <i className="ri-lock-line text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <i className={`${showConfirmPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-lg`}></i>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin"></i>
                      <span>Resetting Password...</span>
                    </>
                  ) : (
                    <>
                      <i className="ri-check-line"></i>
                      <span>Reset Password</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
              </div>

              {/* Back to Login */}
              <div className="text-center">
                <button
                  onClick={handleBackToLogin}
                  className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <i className="ri-arrow-left-line"></i>
                  <span>Back to Login</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Need help?{' '}
            <button className="text-orange-500 hover:underline cursor-pointer whitespace-nowrap">
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
