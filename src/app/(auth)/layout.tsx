import { redirect } from 'next/navigation';

import { getToken } from '../(dashboard)/layout';

import { authServices } from '@/services/authServices';

import { AuthSkeleton } from '@/components/organisms/AuthSkeleton/AuthSkeleton';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getToken();
  if (token && (await authServices.isAuthenticated(token))) redirect('/');

  return <AuthSkeleton>{children}</AuthSkeleton>;
}
