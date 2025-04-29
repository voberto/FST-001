"use client"; // Mark this file as a Client Component

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for Next.js 13+

const RedirectToLogin = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page
    router.push('/login');
  }, [router]);

  return null; // No content to display
};

export default RedirectToLogin;