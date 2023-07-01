'use client';

import { message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';

import styles from './ProfileForm.module.scss';

import { manageToken } from '@/utils/manageToken';

import { userServices } from '@/services/userServices';

import { Button } from '@/components/atoms/Button/Button';
import { ErrorWidget } from '@/components/molecules/ErrorWidget/ErrorWidget';
import { TextField } from '@/components/molecules/Field/TextField/TextField';

import { RegisterDto } from '@/models/authModels';
import { User } from '@/models/userModels';

export const ProfileForm = () => {
  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [updatedUserProfile, setUpdatedUserProfile] =
    useState<Partial<User> | null>(null);
  const [error, setError] = useState<ReactNode | string>('');

  const fetchCurrentUserProfile = async () => {
    const token = manageToken.get();
    const response = await userServices.getCurrentUserProfile(token || '');
    if (response.status === 401) {
      router.push('/login');
      return;
    }

    if (response.status === 200 && response.data)
      return setUserProfile(response.data.user);

    setError(
      `Une erreur inconnue est survenue (${response.status}). Veuillez contacter le support.`
    );
  };

  useEffect(() => {
    fetchCurrentUserProfile();
  }, []);

  const hasTheUserEditedHisProfile = (): boolean => {
    if (!updatedUserProfile || !userProfile) return false;

    type User2 = {
      [key: string]: unknown;
    } & User;

    for (const [key, value] of Object.entries(updatedUserProfile)) {
      if ((userProfile as User2)[key] !== value) return true;
    }

    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!hasTheUserEditedHisProfile() || !updatedUserProfile) return;

    const token = manageToken.get();

    const updateUserDto: Partial<RegisterDto> = {
      ...updatedUserProfile,
      profilePicture: undefined,
    };

    const response = await userServices.updateUserProfile(
      token || '',
      updateUserDto
    );

    if (response.status === 200 && response.data) {
      fetchCurrentUserProfile();
      return messageApi.success('Votre profil a été modifié avec succès !');
    }

    setError(
      `Une erreur inconnue est survenue (${response.status}). Veuillez contacter le support.`
    );
  };

  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit} className={styles.profileForm}>
        {userProfile?.lastName && userProfile.firstName ? (
          <div className={styles.grid}>
            <TextField
              label="Nom"
              defaultValue={userProfile?.lastName}
              onValueChange={(value) =>
                setUpdatedUserProfile({
                  ...updatedUserProfile,
                  lastName: value.trim(),
                })
              }
            />
            <TextField
              label="Prénom"
              defaultValue={userProfile?.firstName}
              onValueChange={(value) =>
                setUpdatedUserProfile({
                  ...updatedUserProfile,
                  firstName: value.trim(),
                })
              }
            />
          </div>
        ) : null}
        <div className={styles.buttonsContainer}>
          <Button disabled={!hasTheUserEditedHisProfile()} type="submit">
            Enregistrer
          </Button>
        </div>
        {error ? <ErrorWidget>{error}</ErrorWidget> : null}
      </form>
    </>
  );
};
