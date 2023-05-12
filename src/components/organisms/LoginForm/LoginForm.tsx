'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, ReactNode, useState } from 'react';

import styles from './LoginForm.module.scss';

import { manageToken } from '@/utils/manageToken';

import { authServices } from '@/services/authServices';

import { Button } from '@/components/atoms/Button/Button';
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
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <TextField
        label="Email"
        onValueChange={(emailValue) =>
          setLoginFormData({ ...loginFormData, email: emailValue.trim() })
        }
      />
      <TextField
        label="Mot de passe"
        onValueChange={(passwordValue) =>
          setLoginFormData({ ...loginFormData, password: passwordValue })
        }
      />
      <Button type="submit" disabled={isLoading}>
        Se connecter
      </Button>
      {error ? <span>{error}</span> : null}
    </form>
  );
};
