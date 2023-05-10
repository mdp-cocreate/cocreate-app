import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Accueil',
  description: 'Bienvenue sur Cocreate',
};

export default function Dashboard() {
  return (
    <>
      <h1>Hello, dashboard!</h1>
      <Link href="/projects">Projects</Link>
    </>
  );
}
