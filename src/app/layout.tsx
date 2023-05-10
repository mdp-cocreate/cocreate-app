import { Inter } from 'next/font/google';

import '@/styles/globals.css';

const inter = Inter({
  weight: ['400', '500', '600'],
  style: ['normal'],
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
