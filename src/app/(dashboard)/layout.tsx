import { DashboardSkeleton } from '@/components/organisms/DashboardSkeleton/DashboardSkeleton';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardSkeleton>{children}</DashboardSkeleton>;
}
