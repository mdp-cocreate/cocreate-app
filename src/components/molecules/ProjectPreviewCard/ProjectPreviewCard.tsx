import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { ProjectMembersPreview } from '../ProjectMembersPreview/ProjectMembersPreview';
import styles from './ProjectPreviewCard.module.scss';

import { capitalize } from '@/utils/capitalize';
import { getTimeElapsedSinceDate } from '@/utils/getTimeElapsedSinceDate';

import { ProjectPreview } from '@/models/projectModels';

interface Props {
  projectPreview: ProjectPreview;
  fill?: boolean;
}

export const ProjectPreviewCard = ({ projectPreview, fill = false }: Props) => {
  const { slug, coverImage, name, shortDescription, createdAt, members } =
    projectPreview;

  return (
    <div className={`${styles.projectPreviewCard} ${fill ? styles.fill : ''}`}>
      <Link href={`/projects/${slug}`}>
        <div className={styles.coverImageContainer}>
          <Image
            className={styles.image}
            src={coverImage || '/authIllustration.png'}
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
          {capitalize(getTimeElapsedSinceDate(createdAt))}
        </span>
        <ProjectMembersPreview membersPreview={members} />
      </div>
    </div>
  );
};
