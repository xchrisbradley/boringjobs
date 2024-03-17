"use client";

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Toaster } from "sonner";
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from '@/lib/wagmi';
import { Theme } from '@radix-ui/themes';

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()

  return (
    <Theme>
      <UserProvider>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <Toaster className="dark:hidden" />
            <Toaster theme="dark" className="hidden dark:block" />
            {children}
          </QueryClientProvider>
        </WagmiProvider>
      </UserProvider>
    </Theme>
  );
}