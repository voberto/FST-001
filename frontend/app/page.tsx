"use client"; // Mark this file as a Client Component

import RedirectToLogin from './RedirectToLogin'; // Import your RedirectToLogin component
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext'; // Adjust the import path as necessary

const RootPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth(); // Get authentication state from context

  useEffect(() => {
    // Redirect based on authentication state
    if (isAuthenticated) {
      router.push('/dashboard'); // Redirect to dashboard if authenticated
    } else {
      router.push('/login'); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, router]); // Ensure this runs when isAuthenticated changes

  return <RedirectToLogin />; // Render the RedirectToLogin component
};

export default RootPage;