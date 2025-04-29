"use client"; // Mark this file as a Client Component

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive"
import { SiteHeader } from "@/components/dashboard/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../AuthContext';
import { Spinner } from '@/components/ui/spinner';


// Define the User type
interface User {
  name: string;
  email: string;
}

const DashboardPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);                   // Add loading state
  const [userData, setUserData] = useState<User | null>(null);    // State to hold user data

  useEffect(() => {
    const timer = setTimeout(() => {
        if (!isAuthenticated) {
            router.push('/login'); // Redirect to login if not authenticated
        } else {
            setLoading(false); // Set loading to false if authenticated
        }
    }, 1000); // 1 second delay

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="large" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardPage;
