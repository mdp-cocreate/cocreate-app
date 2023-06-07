'use client';

import React, { useEffect, useState } from 'react';

import { ProjectPreviewsSection } from '../ProjectPreviewsSection';
import styles from './ProjectPreviewsThatTheUserOwnsSection.module.scss';

import { manageToken } from '@/utils/manageToken';

import { projectServices } from '@/services/projectServices';

import { ProjectPreview } from '@/models/projectModels';

interface Props {
  userId?: number;
}

export const ProjectPreviewsThatTheUserOwnsSection = ({ userId }: Props) => {
  const [projectsPreviewsThatTheUserOwns, setProjectsPreviewsThatTheUserOwns] =
    useState<ProjectPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const retrieveProjectsPreviewsThatTheUserOwns = async () => {
    setIsLoading(true);
    const response = await projectServices.getProjectPreviewsThatTheUserOwns(
      manageToken.get() || '',
      userId
    );
    setProjectsPreviewsThatTheUserOwns(response?.data?.previews || []);
    setIsLoading(false);
  };

  useEffect(() => {
    retrieveProjectsPreviewsThatTheUserOwns();
  }, []);

  const notFoundDisplay = userId ? (
    <p>Cet utilisateur ne possède aucun projet</p>
  ) : (
    <>
      <p className={styles.notFoundParagraph}>Vous ne possédez aucun projet</p>
    </>
  );

  return (
    <ProjectPreviewsSection
      title={userId ? 'Ses projets' : 'Vos projets'}
      projectPreviews={projectsPreviewsThatTheUserOwns}
      isLoading={isLoading}
      notFoundDisplay={notFoundDisplay}
    />
  );
};
