'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import styles from './page.module.scss';

import { authServices } from '@/services/authServices';

export default function ValidateEmail() {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | ReactNode>('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const user = searchParams.get('user');
  const token = searchParams.get('token');

  const validateEmail = async () => {
    if (!user || !token) return router.push('/login');

    setLoading(true);
    const response = await authServices.validateEmail({ email: user, token });
    setLoading(false);

    if (response.status === 404)
      return setError(
        <>
          Aucun compte n&apos;est lié à cette adresse email.{' '}
          <Link href="/register" className="link">
            Inscrivez-vous
          </Link>
        </>
      );

    if (response.status === 409)
      return setError(
        <>
          Ce compte a déjà été validé.{' '}
          <Link href="/login" className="link">
            Connectez-vous
          </Link>
        </>
      );

    if (response.status === 401)
      return setError(
        "Impossible de valider ce compte. Assurez-vous de cliquer sur l'URL reçue par email sans la modifier puis réessayez."
      );

    if (response.status === 200 || response.status === 201) {
      setError('');
      setSuccess(true);
    } else
      setError(
        `Une erreur inconnue est survenue (${response.status}). Veuillez contacter le support.`
      );
  };

  useEffect(() => {
    if (!user || !token) {
      router.push('/login');
      return;
    }

    validateEmail();
  }, [user, token]);

  if (loading) return null;

  if (error || !success) return <p className={styles.errorMessage}>{error}</p>;

  return (
    <div className={styles.validateEmailPage}>
      <section className={styles.content}>
        <figure className={styles.figure}>
          <Image
            src="/accountValidatedIllustration.svg"
            alt="Account validated illustration"
            fill
            style={{ objectFit: 'contain', objectPosition: 'center' }}
          />
        </figure>
        <h1>Votre compte est validé !</h1>
        <Link href="/login">Connectez-vous</Link>
      </section>
    </div>
  );
}
