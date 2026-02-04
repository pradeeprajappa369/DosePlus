import { LoginApi } from '@/API/authAPI\'s';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // const handleLogin = (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   // Super Admin login check
  //   if (email === 'superadmin@doseplus.com' && password === 'super123') {
  //     navigate('/super-admin/dashboard');
  //     return;
  //   }
    
  //   // Staff login check
  //   if (email === 'staff@doseplus.com' && password === 'staff123') {
  //     navigate('/staff-dashboard');
  //     return;
  //   }
    
  //   // Regular admin login
  //   navigate('/dashboard');
  // };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
  
    try {
      const res = await LoginApi({
        email,
        password,
      });
  
      // Assuming backend sends token + role
      const { token, user } = res.data;
  
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
  
      // Role-based navigation
      if (user.role === "SUPER_ADMIN") {
        navigate("/super-admin/dashboard");
      } else if (user.role === "STAFF") {
        navigate("/staff-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleOTPLogin = () => {
    setError('');
    // OTP login logic
    alert('OTP will be sent to your registered mobile number');
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-orange-400 to-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <i className="ri-capsule-line text-2xl text-orange-500"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Dose Plus</h1>
              <p className="text-sm text-white/90">Pharmacy Software</p>
            </div>
          </div>

          {/* Center Content */}
          <div className="flex flex-col items-center justify-center flex-1">
            {/* Illustration */}
            <div className="mb-8">
              <img
                src="https://readdy.ai/api/search-image?query=Modern%20minimalist%20illustration%20of%20a%20pharmacy%20management%20system%20with%20medicine%20bottles%20pills%20prescription%20papers%20and%20digital%20billing%20interface%20on%20a%20tablet%20screen%20clean%20professional%20medical%20theme%20with%20orange%20and%20white%20color%20scheme%20simple%20flat%20design%20style%20suitable%20for%20healthcare%20software&width=500&height=400&seq=login-illustration-pharmacy&orientation=landscape"
                alt="Pharmacy Management"
                className="w-full max-w-md h-auto object-contain drop-shadow-2xl"
              />
            </div>

            {/* Text Content */}
            <div className="text-center max-w-md">
              <h2 className="text-3xl font-bold text-white mb-4">
                Smart Pharmacy Management
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                Billing, Inventory, Reports – All in One
              </p>
              
              {/* Features */}
              <div className="mt-8 space-y-3">
                {[
                  { icon: 'ri-bill-line', text: 'Quick Billing & Invoicing' },
                  { icon: 'ri-database-2-line', text: 'Real-time Inventory Tracking' },
                  { icon: 'ri-bar-chart-box-line', text: 'Comprehensive Reports' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-white/90">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <i className={`${feature.icon} text-white`}></i>
                    </div>
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-white/80 text-sm">
            <p>Trusted by 1000+ pharmacies across India</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <i className="ri-capsule-line text-2xl text-white"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dose Plus</h1>
              <p className="text-sm text-gray-600">Pharmacy Software</p>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-sm text-gray-600">Sign in to your pharmacy dashboard</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <i className="ri-error-warning-line text-red-500 text-lg mt-0.5"></i>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email/Mobile Field */}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email or mobile number"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                    <i className="ri-lock-line text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-lg`}></i>
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    if (window.REACT_APP_NAVIGATE) {
                      window.REACT_APP_NAVIGATE('/forgot-password');
                    }
                  }}
                  className="text-sm text-orange-500 hover:text-orange-600 font-medium cursor-pointer whitespace-nowrap"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin"></i>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <i className="ri-login-box-line"></i>
                    <span>Login</span>
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* OTP Login Button */}
              <button
                type="button"
                onClick={handleOTPLogin}
                className="w-full py-3 bg-white border-2 border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-smartphone-line"></i>
                <span>Login with OTP</span>
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                New pharmacy?{' '}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-orange-500 hover:text-orange-600 font-semibold cursor-pointer whitespace-nowrap"
                >
                  Create account
                </button>
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <button className="text-orange-500 hover:underline cursor-pointer whitespace-nowrap">
                Terms of Service
              </button>{' '}
              and{' '}
              <button className="text-orange-500 hover:underline cursor-pointer whitespace-nowrap">
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
