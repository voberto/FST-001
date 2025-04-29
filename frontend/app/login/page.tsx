"use client"; // Mark this file as a Client Component

import { LoginForm } from "@/components/login/login-form"; // Correct import path for LoginForm
import { useAuth } from '../../app/AuthContext'; // Correct import path for useAuth
import { useRouter } from 'next/navigation'; // Import useRouter
import { getCsrfToken, login as apiLogin } from '@/services/api'; // Import the API functions
import { useState, useEffect } from 'react'; // Import useState and useEffect
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Import card components
import { Spinner } from "@/components/ui/spinner"; // Correct import path for Spinner


const LoginPage = () => {
  const { login, logoutMessage } = useAuth(); // Get logout message from context
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [successMessage, setSuccessMessage] = useState(logoutMessage); // State for success message

  useEffect(() => {
    if (logoutMessage) {
      setSuccessMessage(logoutMessage); // Set success message from context
    }
  }, [logoutMessage]);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true); // Set loading to true
      setSuccessMessage(''); // Clear success message on new login attempt
      await getCsrfToken(); // Get CSRF token before login
      const userData = await apiLogin(email, password); // Call the login API
  
      // Store tokens in local storage
      localStorage.setItem('accessToken', userData.access); // Store access token
      localStorage.setItem('refreshToken', userData.refresh); // Store refresh token
  
      // Call the login function with the access token
      login(userData.access); // Pass the access token to the login function

      // Delay for a moment to show the loading spinner
      setTimeout(() => {
        router.push('/dashboard'); // Redirect to dashboard
      }, 1000); // 1 second delay
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Login failed. Please check your credentials."); // Set error message
      setLoading(false); // Reset loading state on error
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <Spinner size="large" />
            <span className="ml-2">Loading...</span>
          </div>
        ) : (
          <>
            {(successMessage || errorMessage) && (
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className={successMessage ? "text-green-500" : "text-red-500"}>
                    {successMessage ? "Success" : "Error"}
                  </CardTitle>
                  <CardDescription>
                    {successMessage || errorMessage}
                  </CardDescription>
                </CardHeader>
                <CardContent />
              </Card>
            )}
            <LoginForm onLogin={handleLogin} /> {/* Keep the LoginForm as is */}
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;