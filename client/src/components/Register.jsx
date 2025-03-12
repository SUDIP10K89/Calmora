import { useState } from "react";
import { Heart, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

const RegisterScreen = () => {
  const [isDark, setIsDark] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
   // Create user with email and password
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', userCredential.user);
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      isDark ? 'bg-gray-950' : 'bg-gray-50'
    }`}>
      <div className={`w-full max-w-md p-6 ${
        isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
      } backdrop-blur-lg border rounded-2xl`}>
        
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <div className={`flex items-center justify-center w-16 h-16 mb-4 rounded-xl ${
            isDark 
            ? 'bg-purple-600/20 text-purple-400' 
            : 'bg-purple-100 text-purple-600'
          }`}>
            <Heart className="h-8 w-8" />
          </div>
          <h1 className={`text-2xl font-semibold mb-1 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome to Calmora
          </h1>
          <p className={`text-sm text-center ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Create your account to start your mental wellness journey
          </p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className={`p-3 rounded-lg text-sm ${
              isDark ? 'bg-red-500/10 text-red-200 border border-red-500/20' 
                     : 'bg-red-50 text-red-600 border border-red-100'
            }`}>
              {error}
            </div>
          )}
          
          {/* Username Field */}
          <div className="space-y-1">
            <label 
              htmlFor="username" 
              className={`block text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className={`h-5 w-5 ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`} />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full pl-10 pr-3 py-3 rounded-xl outline-none transition-colors ${
                  isDark 
                  ? 'bg-gray-800/50 text-white border-gray-700 focus:border-purple-500' 
                  : 'bg-white text-gray-900 border-gray-200 focus:border-purple-600'
                } border`}
                placeholder="yourname"
              />
            </div>
          </div>
          
          {/* Email Field */}
          <div className="space-y-1">
            <label 
              htmlFor="email" 
              className={`block text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className={`h-5 w-5 ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`} />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-3 py-3 rounded-xl outline-none transition-colors ${
                  isDark 
                  ? 'bg-gray-800/50 text-white border-gray-700 focus:border-purple-500' 
                  : 'bg-white text-gray-900 border-gray-200 focus:border-purple-600'
                } border`}
                placeholder="youremail@example.com"
              />
            </div>
          </div>
          
          {/* Password Field */}
          <div className="space-y-1">
            <label 
              htmlFor="password" 
              className={`block text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`h-5 w-5 ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`} />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-10 py-3 rounded-xl outline-none transition-colors ${
                  isDark 
                  ? 'bg-gray-800/50 text-white border-gray-700 focus:border-purple-500' 
                  : 'bg-white text-gray-900 border-gray-200 focus:border-purple-600'
                } border`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className={`h-5 w-5 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                ) : (
                  <Eye className={`h-5 w-5 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                )}
              </button>
            </div>
          </div>
          
          {/* Confirm Password Field */}
          <div className="space-y-1">
            <label 
              htmlFor="confirmPassword" 
              className={`block text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`h-5 w-5 ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`} />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full pl-10 pr-10 py-3 rounded-xl outline-none transition-colors ${
                  isDark 
                  ? 'bg-gray-800/50 text-white border-gray-700 focus:border-purple-500' 
                  : 'bg-white text-gray-900 border-gray-200 focus:border-purple-600'
                } border`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className={`h-5 w-5 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                ) : (
                  <Eye className={`h-5 w-5 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                )}
              </button>
            </div>
          </div>

          {/* Sign In Link */}
          <div className={`text-sm text-center mt-6 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Already have an account?{" "}
            <a href="/" className="font-medium text-purple-500 hover:text-purple-400">
              Sign in
            </a>
          </div>
          
          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isDark ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'
            } focus:ring-purple-500 text-white bg-purple-600 hover:bg-purple-700 flex justify-center items-center transition-colors ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </>
            ) : (
              "Sign up"
            )}
          </button>
          
          
        </form>
      </div>
      
      {/* Theme toggle button */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`absolute top-4 right-4 p-2 rounded-lg ${
          isDark 
          ? 'bg-gray-800 text-gray-400 hover:text-gray-300' 
          : 'bg-gray-100 text-gray-600 hover:text-gray-900'
        }`}
      >
        {isDark ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default RegisterScreen;