'use client';

import { message } from 'antd';
import React, { useState } from 'react';

import { manageToken } from '@/utils/manageToken';

import { projectServices } from '@/services/projectServices';

import { Button } from '@/components/atoms/Button/Button';

interface Props {
  projectId: number;
  hasRequestedToJoin: boolean;
}

export const AskToJoinSection = ({ projectId, hasRequestedToJoin }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [joinRequestHasBeenSent, setJoinRequestHasBeenSent] =
    useState(hasRequestedToJoin);

  const askToJoinProject = async () => {
    const token = manageToken.get();

    const response = await projectServices.askToJoinProject(
      token || '',
      projectId
    );

    if (response.status === 201) {
      setJoinRequestHasBeenSent(true);
      return messageApi.success('Votre demande a bien été envoyée !');
    }

    if (response.status === 409)
      return messageApi.error('Vous avez déjà demandé à rejoindre ce projet.');

    messageApi.error(
      `Une erreur inconnue est survenue (${response.status}). Veuillez contacter le support.`
    );
  };

  const isButtonDisabled = joinRequestHasBeenSent || hasRequestedToJoin;

  return (
    <>
      {contextHolder}
      <Button onClick={askToJoinProject} disabled={isButtonDisabled}>
        {isButtonDisabled
          ? "Demande en attente d'approbation"
          : 'Demander à rejoindre le projet'}
      </Button>
    </>
  );
};
