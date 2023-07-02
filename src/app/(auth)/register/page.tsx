import { Metadata } from 'next';
import Link from 'next/link';

import styles from './page.module.scss';

import { RegisterForm } from '@/components/organisms/RegisterForm/RegisterForm';

export const metadata: Metadata = {
  title: "S'inscrire",
  description: 'Inscrivez-vous sur la plateforme Cocreate',
};

export default function Register() {
  return (
    <div className={styles.registerPage}>
      <div className={styles.head}>
        <h1 className={styles.heading}>Inscrivez-vous</h1>
        <span>
          Déjà un compte ?{' '}
          <Link href="/login" className="link">
            Connectez-vous
          </Link>
        </span>
      </div>
      <RegisterForm />
    </div>
  );
}
