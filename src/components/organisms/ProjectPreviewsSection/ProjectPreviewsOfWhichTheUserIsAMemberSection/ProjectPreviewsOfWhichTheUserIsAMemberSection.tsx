'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { ProjectPreviewsSection } from '../ProjectPreviewsSection';
import styles from './ProjectPreviewsOfWhichTheUserIsAMemberSection.module.scss';

import { manageToken } from '@/utils/manageToken';

import { projectServices } from '@/services/projectServices';

import { Button } from '@/components/atoms/Button/Button';

import { ProjectPreview } from '@/models/projectModels';

interface Props {
  userId?: number;
}

export const ProjectPreviewsOfWhichTheUserIsAMemberSection = ({
  userId,
}: Props) => {
  const [
    projectPreviewsOfWhichTheUserIsAMember,
    setProjectPreviewsOfWhichTheUserIsAMember,
  ] = useState<ProjectPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const retrieveProjectPreviewsOfWhichTheUserIsAMember = async () => {
    setIsLoading(true);
    const response =
      await projectServices.getProjectPreviewsOfWhichTheUserIsAMember(
        manageToken.get() || '',
        userId
      );
    setProjectPreviewsOfWhichTheUserIsAMember(response.data?.previews || []);
    setIsLoading(false);
  };

  useEffect(() => {
    retrieveProjectPreviewsOfWhichTheUserIsAMember();
  }, []);

  const notFoundDisplay = userId ? (
    <p>Cet utilisateur ne participe à aucun projet</p>
  ) : (
    <>
      <p className={styles.notFoundParagraph}>
        Vous ne participez à aucun projet
      </p>
      <Link href="/search">
        <Button focusable={false}>Chercher un projet</Button>
      </Link>
    </>
  );

  return (
    <ProjectPreviewsSection
      title={
        userId
          ? 'Projets auxquels cet utilisateur participe'
          : 'Projets auxquels vous participez'
      }
      projectPreviews={projectPreviewsOfWhichTheUserIsAMember}
      isLoading={isLoading}
      notFoundDisplay={notFoundDisplay}
    />
  );
};
