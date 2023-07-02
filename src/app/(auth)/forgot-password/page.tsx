'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useState } from 'react';

import styles from './page.module.scss';

import { regex } from '@/utils/regex';

import { authServices } from '@/services/authServices';

import { Button } from '@/components/atoms/Button/Button';
import { TextField } from '@/components/molecules/Field/TextField/TextField';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isTheEmailValid, setIsTheEmailValid] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isTheEmailSent, setIsEmailSent] = useState(false);

  const [error, setError] = useState<string | ReactNode>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const response = await authServices.sendResetPasswordEmail(email);
    setLoading(false);

    if (response.status === 404)
      return setError(
        <>
          Cette adresse email n&apos;est liée à aucun compte Cocreate.{' '}
          <Link href="/register" className="link">
            Inscrivez-vous
          </Link>
        </>
      );

    if (response.status === 403)
      return setError(
        "Vous devez d'abord validez votre compte. Vérifiez votre boîte mail."
      );

    if ([200, 201].includes(response.status)) return setIsEmailSent(true);

    setError(
      `Une erreur inconnue est survenue (${response.status}). Veuillez contacter le support.`
    );
  };

  if (isTheEmailSent)
    return (
      <div className={styles.successSection}>
        <section className={styles.content}>
          <figure className={styles.figure}>
            <Image
              src="/resetPasswordIllustration.svg"
              alt="Reset password illustration"
              fill
              style={{ objectFit: 'contain', objectPosition: 'center' }}
            />
          </figure>
          <h1>Nous vous avons envoyé un mail !</h1>
          <p>
            Vérifiez votre boîte mail et cliquez sur le lien pour lancer la
            procédure de récupération du mot de passe
          </p>
        </section>
      </div>
    );

  return (
    <div className={styles.forgotPasswordPage}>
      <div className={styles.head}>
        <h1 className={styles.heading}>Mot de passe oublié</h1>
        <p>
          Nous vous enverrons un mail contenant les instruction pour récupérer
          votre mot de passe
        </p>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          label="Email associé à votre compte"
          defaultValue={email}
          onValueChange={(value) => setEmail(value)}
          rules={[{ name: 'Doit être un email', pattern: regex.email }]}
          setIsValid={setIsTheEmailValid}
        />
        <Button type="submit" block disabled={!isTheEmailValid || loading}>
          Envoyer un mail de récupération
        </Button>
        {error ? <p>{error}</p> : null}
      </form>
    </div>
  );
}
