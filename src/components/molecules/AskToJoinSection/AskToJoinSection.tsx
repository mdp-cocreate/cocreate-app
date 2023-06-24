'use client';

import { message } from 'antd';
import React from 'react';

import { manageToken } from '@/utils/manageToken';

import { projectServices } from '@/services/projectServices';

import { Button } from '@/components/atoms/Button/Button';

export const AskToJoinSection = ({ projectId }: { projectId: number }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const askToJoinProject = async () => {
    const token = manageToken.get();

    const response = await projectServices.askToJoinProject(
      token || '',
      projectId
    );

    if (response.status === 201)
      return messageApi.success('Votre demande a bien été envoyée !');

    if (response.status === 409)
      return messageApi.error('Vous avez déjà demandé à rejoindre ce projet.');

    messageApi.error(
      `Une erreur inconnue est survenue (${response.status}). Veuillez contacter le support.`
    );
  };

  return (
    <>
      {contextHolder}
      <Button onClick={askToJoinProject}>Demander à rejoindre le projet</Button>
    </>
  );
};
