'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ReactNode, useState } from 'react';

import styles from './page.module.scss';

import { authServices } from '@/services/authServices';

import { Button } from '@/components/atoms/Button/Button';
import PasswordField from '@/components/molecules/Field/PasswordField/PasswordField';

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const email = searchParams.get('user');
  const token = searchParams.get('token');

  const [error, setError] = useState<string | ReactNode>('');

  const [newPassword, setNewPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [hasPasswordBeenReset, setHasPasswordBeenReset] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !token)
      return setError(
        "L'URL semble erronée. Assurez-vous de cliquer sur l'URL reçue par mail sans la modifier."
      );

    setLoading(true);
    const response = await authServices.resetPassword({
      email,
      token,
      newPassword,
    });
    setLoading(false);

    if (response.status === 401)
      return setError(
        "L'URL semble erronée. Assurez-vous de cliquer sur l'URL reçue par mail sans la modifier."
      );

    if (response.status === 403)
      return setError(
        "Vous devez d'abord validez votre compte. Vérifiez votre boîte mail."
      );

    if (response.status === 200 || response.status === 201) {
      setError('');
      setHasPasswordBeenReset(true);
      return;
    }

    setError(
      `Une erreur inconnue est survenue (${response.status}). Veuillez contacter le support.`
    );
  };

  if (hasPasswordBeenReset)
    return (
      <div className={styles.successMessage}>
        <section className={styles.content}>
          <figure className={styles.figure}>
            <Image
              src="/resetPasswordIllustration.svg"
              alt="Reset password illustration"
              fill
              style={{ objectFit: 'contain', objectPosition: 'center' }}
            />
          </figure>
          <h1>Votre mot de passe a été réinitialisé !</h1>
          <Link href="/login" className="link">
            Connectez-vous
          </Link>
        </section>
      </div>
    );

  return (
    <div className={styles.resetPasswordPage}>
      <div className={styles.head}>
        <h1 className={styles.heading}>Nouveau mot de passe</h1>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <PasswordField
          value={newPassword}
          setValue={setNewPassword}
          setIsPasswordValid={setIsPasswordValid}
        />
        <Button type="submit" block disabled={!isPasswordValid || loading}>
          Réinitialiser le mot de passe
        </Button>
        {error ? <p className={styles.errorMessage}>{error}</p> : null}
      </form>
    </div>
  );
}
