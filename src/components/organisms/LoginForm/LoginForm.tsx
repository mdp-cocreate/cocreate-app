'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, ReactNode, useState } from 'react';

import styles from './LoginForm.module.scss';

import { manageToken } from '@/utils/manageToken';

import { authServices } from '@/services/authServices';

import { Button } from '@/components/atoms/Button/Button';
import { ErrorWidget } from '@/components/molecules/ErrorWidget/ErrorWidget';
import { TextField } from '@/components/molecules/Field/TextField/TextField';

import { LoginDto } from '@/models/authModels';

export const LoginForm = () => {
  const router = useRouter();

  const [loginFormData, setLoginFormData] = useState<LoginDto>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | ReactNode | null>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    setIsLoading(true);
    const response = await authServices.login(loginFormData);
    setIsLoading(false);

    if (response.status === 401)
      return setError('Identifiant ou mot de passe incorrect(s).');

    if (response.status === 201 && response.data) {
      manageToken.set(response.data.token);
      router.refresh();
      return;
    }

    setError(
      `Une erreur inconnue est survenue (${response.status}). Veuillez contacter le support.`
    );
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <TextField
        label="Email"
        defaultValue={loginFormData.email}
        onValueChange={(emailValue) =>
          setLoginFormData({ ...loginFormData, email: emailValue.trim() })
        }
      />
      <TextField
        label="Mot de passe"
        type="password"
        defaultValue={loginFormData.password}
        onValueChange={(passwordValue) =>
          setLoginFormData({ ...loginFormData, password: passwordValue })
        }
      />
      <Link href="/forgot-password">Mot de passe oublié ?</Link>
      <Button type="submit" disabled={isLoading}>
        Se connecter
      </Button>
      {error ? <ErrorWidget>{error}</ErrorWidget> : null}
    </form>
  );
};
