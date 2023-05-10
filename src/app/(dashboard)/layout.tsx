import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { manageToken } from '@/utils/manageToken';

import { appServices } from '@/services/appServices';
import { authServices } from '@/services/authServices';

import { DashboardSkeleton } from '@/components/organisms/DashboardSkeleton/DashboardSkeleton';

export async function getToken(): Promise<string | undefined> {
  const cookiesList = cookies();
  const token = cookiesList.get(manageToken.key);
  return token?.value;
}

async function getDomains() {
  const response = await appServices.getDomains();

  if (response.status === 200 && response.data) return response.data;
  else throw new Error('Failed to fetch domains');
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getToken();
  if (!token || !(await authServices.isAuthenticated(token)))
    redirect('/login');

  const domains = await getDomains();

  return <DashboardSkeleton domains={domains}>{children}</DashboardSkeleton>;
}
