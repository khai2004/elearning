import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ToastProvider from '@/components/provider/toast-provider';
import { ConfettiProvider } from '@/components/provider/confetti-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang='en'>
        <body className={inter.className}>
          <ConfettiProvider />
          {children}
          <ToastProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}
