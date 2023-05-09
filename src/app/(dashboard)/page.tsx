import Link from 'next/link';

export default function Dashboard() {
  return (
    <>
      <h1>Hello, dashboard!</h1>
      <Link href="/projects">Projects</Link>
    </>
  );
}
