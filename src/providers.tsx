"use client";

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Toaster } from "sonner";


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <Toaster className="dark:hidden" />
      <Toaster theme="dark" className="hidden dark:block" />
      {children}
    </UserProvider>
  );
}