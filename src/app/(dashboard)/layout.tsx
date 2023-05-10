import { redirect } from 'next/navigation';

import { getTokenServerSide } from '@/utils/getTokenServerSide';

import { appServices } from '@/services/appServices';
import { authServices } from '@/services/authServices';

import { DashboardSkeleton } from '@/components/organisms/DashboardSkeleton/DashboardSkeleton';

async function getDomains() {
  const response = await appServices.getDomains();

  if (response.status === 200 && response.data) return response.data.domains;
  else throw new Error('Failed to fetch domains');
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getTokenServerSide();
  if (!token || !(await authServices.isAuthenticated(token)))
    redirect('/login');

  return (
    <DashboardSkeleton domains={await getDomains()}>
      {children}
    </DashboardSkeleton>
  );
}
