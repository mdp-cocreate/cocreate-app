import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { ProjectMembersPreview } from '../ProjectMembersPreview/ProjectMembersPreview';
import styles from './ProjectPreviewCard.module.scss';

import { capitalize } from '@/utils/capitalize';

import { ProjectPreview } from '@/models/projectModels';

interface Props {
  projectPreview: ProjectPreview;
}

export const ProjectPreviewCard = ({ projectPreview }: Props) => {
  const { slug, coverImage, name, shortDescription, createdAt, members } =
    projectPreview;

  const getTimeElapsedSinceCreationDate = (): string => {
    const creationDate = new Date(createdAt);
    const now = new Date();

    const seconds = Math.floor(
      (now.getTime() - creationDate.getTime()) / 1000
    ) as number;
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1)
      return `il y a ${interval} an${interval === 1 ? '' : 's'}`;
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `il y a ${interval} mois`;
    interval = Math.floor(seconds / 86400);
    if (interval >= 1)
      return `il y a ${interval} jour${interval === 1 ? '' : 's'}`;
    interval = Math.floor(seconds / 3600);
    if (interval >= 1)
      return `il y a ${interval} heure${interval === 1 ? '' : 's'}`;
    interval = Math.floor(seconds / 60);
    if (interval >= 1)
      return `il y a ${interval} minute${interval === 1 ? '' : 's'}`;
    return `à l'instant`;
  };

  return (
    <div className={styles.projectPreviewCard}>
      <Link href={`/projects/${slug}`}>
        <div className={styles.coverImageContainer}>
          {/* TODO Revoir image */}
          {/* TODO Add sizes props */}
          <Image
            className={styles.image}
            src={coverImage || '/defaultImg.png'}
            alt={`${projectPreview.name} project's cover image`}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </Link>
      <div className={styles.body}>
        <Link className={styles.projectNameLink} href={`/projects/${slug}`}>
          <h3 className={styles.title}>{name}</h3>
        </Link>
        <p className={styles.shortDescription}>{shortDescription}</p>
        <span className={`small ${styles.createdAt}`}>
          {capitalize(getTimeElapsedSinceCreationDate())}
        </span>
        <ProjectMembersPreview membersPreview={members} />
      </div>
    </div>
  );
};
