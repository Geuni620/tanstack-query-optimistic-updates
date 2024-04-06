import './globals.css';

import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

import { QueryContext } from '@/components/common/query-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster richColors position="top-center" />
        <QueryContext>{children}</QueryContext>
      </body>
    </html>
  );
}
