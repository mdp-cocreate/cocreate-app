import { NotFoundDisplay } from '@/components/organisms/NotFoundDisplay/NotFoundDisplay';

export default function NotFound() {
  return (
    <NotFoundDisplay
      button={{ label: 'Retour à la page de connexion', href: '/login' }}
    />
  );
}
