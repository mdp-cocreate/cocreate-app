import { Metadata } from 'next';
import Link from 'next/link';

import styles from './page.module.scss';

import { LoginForm } from '@/components/organisms/LoginForm/LoginForm';

export const metadata: Metadata = {
  title: 'Se connecter',
  description: 'Connectez-vous à la plateforme Cocreate',
};

export default function Login() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.head}>
        <h1 className={styles.heading}>Se connecter</h1>
        <span>
          Vous n&apos;avez pas de compte ?{' '}
          <Link href="/register" className="link">
            Inscrivez-vous
          </Link>
        </span>
      </div>
      <LoginForm />
    </div>
  );
}
