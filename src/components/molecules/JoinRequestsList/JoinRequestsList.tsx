'use client';

import { message } from 'antd';
import Link from 'next/link';
import React from 'react';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import styles from './JoinRequestsList.module.scss';

import { capitalize } from '@/utils/capitalize';
import { getTimeElapsedSinceDate } from '@/utils/getTimeElapsedSinceDate';
import { manageToken } from '@/utils/manageToken';

import { projectServices } from '@/services/projectServices';

import { Button } from '@/components/atoms/Button/Button';

import { JoinRequest } from '@/models/projectModels';

interface Props {
  joinRequests: JoinRequest[];
  setJoinRequests: React.Dispatch<React.SetStateAction<JoinRequest[] | null>>;
}

export const JoinRequestsList = ({ joinRequests, setJoinRequests }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const manageJoinRequest = async (
    projectSlug: string,
    userSlug: string,
    type: 'accept' | 'deny'
  ) => {
    const token = manageToken.get();
    const response = await projectServices.manageJoinRequest(
      token || '',
      {
        projectSlug,
        userSlug,
      },
      type
    );

    if (response.status === 201) {
      messageApi.success(
        type === 'accept'
          ? 'Votre approbation a bien été prise en compte !'
          : 'Votre refus a bien été pris en compte.'
      );

      setJoinRequests(
        joinRequests.filter(
          (joinRequest) =>
            !(
              joinRequest.project.slug === projectSlug &&
              joinRequest.user.slug === userSlug
            )
        )
      );
    } else
      messageApi.error(
        `Une erreur inconnue est survenue (${response.status}). Veuillez contacter le support.`
      );
  };

  return (
    <>
      {contextHolder}
      <ul className={styles.joinRequestsList}>
        {joinRequests.length === 0 ? (
          <p>Vous n&apos;avez aucune demande en attente.</p>
        ) : (
          <>
            {joinRequests.map(({ user, project, createdAt }) => (
              <li className={styles.joinRequest} key={createdAt.toString()}>
                <div className={styles.flex}>
                  <div className={styles.flex}>
                    <p className={styles.text}>
                      <Link href={`/users/${user.slug}`}>
                        {user.firstName} {user.lastName}
                      </Link>{' '}
                      a demandé à rejoindre le projet{' '}
                      <Link href={`/projects/${project.slug}`}>
                        {project.name}
                      </Link>
                    </p>{' '}
                    <span className={`small ${styles.date}`}>
                      {capitalize(getTimeElapsedSinceDate(createdAt))}
                    </span>
                  </div>
                  <div className={styles.buttonsContainer}>
                    <Button
                      color="primary"
                      onClick={() =>
                        manageJoinRequest(project.slug, user.slug, 'accept')
                      }
                    >
                      <CheckOutlined />
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() =>
                        manageJoinRequest(project.slug, user.slug, 'deny')
                      }
                    >
                      <CloseOutlined />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
    </>
  );
};
