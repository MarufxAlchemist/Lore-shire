// src/app/layout.tsx
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import Header from '@/components/Header';
import theme from '@/theme';
import { CssVarsProvider } from '@mui/joy/styles';
import { AuthProvider } from '@/context/AuthContext'; // ✅ Auth Context

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Lore shire',
  description: 'A book exchange platform for everyone.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body>
        <CssVarsProvider theme={theme}>
          <AuthProvider> {/* ✅ Wrap entire app in AuthProvider */}
            <Header />     {/* ✅ Now has access to auth context */}
            {children}     {/* ✅ Pages/components can access context */}
          </AuthProvider>
          <SpeedInsights />
        </CssVarsProvider>
      </body>
    </html>
  );
}
