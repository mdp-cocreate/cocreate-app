import Link from 'next/link';
import React from 'react';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import styles from './JoinRequestsList.module.scss';

import { capitalize } from '@/utils/capitalize';
import { getTimeElapsedSinceDate } from '@/utils/getTimeElapsedSinceDate';

import { Button } from '@/components/atoms/Button/Button';

import { JoinRequest } from '@/models/projectModels';

interface Props {
  joinRequests: JoinRequest[];
}

export const JoinRequestsList = ({ joinRequests }: Props) => {
  return (
    <ul className={styles.joinRequestsList}>
      {joinRequests.map(({ user, project, createdAt }) => (
        <li className={styles.joinRequest} key={createdAt.toString()}>
          <div className={styles.flex}>
            <div className={styles.flex}>
              <p className={styles.text}>
                <Link href={`/users/${user.slug}`}>
                  {user.firstName} {user.lastName}
                </Link>{' '}
                a demandé à rejoindre le projet{' '}
                <Link href={`/projects/${project.slug}`}>{project.name}</Link>
              </p>{' '}
              <span className={`small ${styles.date}`}>
                {capitalize(getTimeElapsedSinceDate(createdAt))}
              </span>
            </div>
            <div className={styles.buttonsContainer}>
              <Button color="primary">
                <CheckOutlined />
              </Button>
              <Button color="secondary">
                <CloseOutlined />
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
