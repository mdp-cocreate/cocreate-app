import { AuthSkeleton } from '@/components/organisms/AuthSkeleton/AuthSkeleton';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthSkeleton>{children}</AuthSkeleton>;
}
