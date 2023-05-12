'use client';

import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';

import styles from './ProjectPreviewsSection.module.scss';

import { ProjectPreviewCard } from '@/components/molecules/ProjectPreviewCard/ProjectPreviewCard';

import { ProjectPreview } from '@/models/projectModels';

interface Props {
  title: string;
  projectPreviews: ProjectPreview[];
  isLoading?: boolean;
  notFoundDisplay?: React.ReactNode;
}

export const ProjectPreviewsSection = ({
  title,
  projectPreviews,
  isLoading = false,
  notFoundDisplay,
}: Props) => {
  const displayNotFound = (): React.ReactNode => {
    if (notFoundDisplay) return notFoundDisplay;
    return <span>Aucun projet à afficher</span>;
  };

  return (
    <section className={styles.projectsSection}>
      <h2 className={styles.title}>{title}</h2>
      {projectPreviews?.length ? (
        <ul className={styles.projectList}>
          {projectPreviews.map((projectPreview) => (
            <li key={projectPreview.id}>
              <ProjectPreviewCard projectPreview={projectPreview} />
            </li>
          ))}
          {isLoading ? (
            <li className={styles.loading}>
              <LoadingOutlined />
            </li>
          ) : null}
        </ul>
      ) : (
        <div className={styles.notFoundContainer}>{displayNotFound()}</div>
      )}
    </section>
  );
};
