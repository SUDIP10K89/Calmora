import { useState } from "react";
import { Heart, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import {useNavigate} from 'react-router-dom';

const LoginScreen = () => {
  const [isDark, setIsDark] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setError("");

   
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      navigate('/chat');
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        isDark ? "bg-gray-950" : "bg-gradient-to-br from-gray-50 to-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 ${
          isDark
            ? "bg-gray-900/70 border-gray-800"
            : "bg-white/80 border-gray-200"
        } backdrop-blur-xl border rounded-3xl shadow-xl`}
      >
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-10">
          <div
            className={`flex items-center justify-center w-16 h-16 mb-4 rounded-2xl transition-all duration-300 ${
              isDark
                ? "bg-purple-600/20 text-purple-400 hover:bg-purple-600/30"
                : "bg-purple-100 text-purple-600 hover:bg-purple-200"
            }`}
          >
            <Heart className="h-8 w-8" />
          </div>
          <h1
            className={`text-3xl font-bold mb-2 tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Welcome to Calmora
          </h1>
          <p
            className={`text-sm text-center max-w-xs ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Sign in to continue your journey to better mental wellness
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div
              className={`p-3 rounded-lg text-sm animate-in fade-in ${
                isDark
                  ? "bg-red-500/10 text-red-200 border border-red-500/20"
                  : "bg-red-50 text-red-600 border border-red-100"
              }`}
            >
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="email"
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail
                  className={`h-5 w-5 ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-3 py-3 rounded-xl outline-none transition-all duration-200 ${
                  isDark
                    ? "bg-gray-800/50 text-white border-gray-700 focus:border-purple-500 hover:border-gray-600"
                    : "bg-white text-gray-900 border-gray-200 focus:border-purple-600 hover:border-gray-300"
                } border shadow-sm`}
                placeholder="youremail@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock
                  className={`h-5 w-5 ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-10 py-3 rounded-xl outline-none transition-all duration-200 ${
                  isDark
                    ? "bg-gray-800/50 text-white border-gray-700 focus:border-purple-500 hover:border-gray-600"
                    : "bg-white text-gray-900 border-gray-200 focus:border-purple-600 hover:border-gray-300"
                } border shadow-sm`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff
                    className={`h-5 w-5 ${
                      isDark
                        ? "text-gray-500 hover:text-gray-400"
                        : "text-gray-400 hover:text-gray-500"
                    } transition-colors`}
                  />
                ) : (
                  <Eye
                    className={`h-5 w-5 ${
                      isDark
                        ? "text-gray-500 hover:text-gray-400"
                        : "text-gray-400 hover:text-gray-500"
                    } transition-colors`}
                  />
                )}
              </button>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            className={`w-full py-3 px-4 rounded-xl font-medium border transition-all duration-200 ${
              isDark
                ? "bg-gray-800/50 text-white border-gray-700 hover:bg-gray-800 hover:border-gray-600"
                : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            } flex items-center justify-center space-x-2 shadow-sm`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.04.7-2.36 1.11-3.71 1.11-2.85 0-5.27-1.92-6.13-4.51H2.18v2.84C4.01 20.35 7.76 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.87 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.69-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.76 1 4.01 3.65 2.18 7.07L5.87 9.91c.86-2.59 3.28-4.53 6.13-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isDark ? "focus:ring-offset-gray-900" : "focus:ring-offset-white"
            } focus:ring-purple-500 text-white bg-purple-600 hover:bg-purple-700 flex justify-center items-center transition-all duration-200 shadow-md ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign in with Email"
            )}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div
                className={`w-full border-t ${
                  isDark ? "border-gray-700" : "border-gray-200"
                }`}
              ></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className={`px-2 ${
                  isDark
                    ? "bg-gray-900/70 text-gray-400"
                    : "bg-white/80 text-gray-600"
                }`}
              >
                Or
              </span>
            </div>
          </div>

          <div
            className={`text-sm text-center ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Dont have an account?{" "}
            <a
              href="/register"
              className="font-medium text-purple-500 hover:text-purple-400 transition-colors"
            >
              Sign up
            </a>
          </div>
        </form>
      </div>

      {/* Theme toggle button */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 ${
          isDark
            ? "bg-gray-800 text-gray-400 hover:text-gray-300 hover:bg-gray-700"
            : "bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
        }`}
      >
        {isDark ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default LoginScreen;
