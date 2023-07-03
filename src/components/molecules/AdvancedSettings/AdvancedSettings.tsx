'use client';

import { Popconfirm, message } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

import { manageToken } from '@/utils/manageToken';

import { userServices } from '@/services/userServices';

import { Button } from '@/components/atoms/Button/Button';

export const AdvancedSettings = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const deleteAccount = async () => {
    const token = manageToken.get() || '';
    const response = await userServices.deleteUserAccount(token);

    if (response.status === 200) {
      messageApi.success(
        `Votre compte a été supprimé avec succès. A bientôt !`
      );
      manageToken.remove();
      router.push('/login');
      return;
    }

    messageApi.error(
      `Une erreur inconnue est survenue (${response.status}). Veuillez contacter le support.`
    );
  };

  return (
    <>
      {contextHolder}
      <Popconfirm
        title="Suppression de votre compte"
        description="Confirmez-vous la suppression de votre compte ?"
        okText="Oui"
        cancelText="Non"
        onConfirm={deleteAccount}
      >
        <Button color="alert">Supprimer mon compte</Button>
      </Popconfirm>
    </>
  );
};
