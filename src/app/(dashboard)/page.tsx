import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import styles from './page.module.scss';

import { getTokenServerSide } from '@/utils/getTokenServerSide';

import { projectServices } from '@/services/projectServices';

import { ProjectPreviewsOfWhichTheUserIsAMemberSection } from '@/components/organisms/ProjectPreviewsSection/ProjectPreviewsOfWhichTheUserIsAMemberSection/ProjectPreviewsOfWhichTheUserIsAMemberSection';
import { ProjectPreviewsSection } from '@/components/organisms/ProjectPreviewsSection/ProjectPreviewsSection';
import { ProjectPreviewsThatTheUserOwnsSection } from '@/components/organisms/ProjectPreviewsSection/ProjectPreviewsThatTheUserOwnsSection/ProjectPreviewsThatTheUserOwnsSection';
import { ProjectSearchSection } from '@/components/organisms/ProjectSearchSection/ProjectSearchSection';

export const metadata: Metadata = {
  title: 'Cocreate - Accueil',
  description: 'Bienvenue sur Cocreate',
};

async function getProjectPreviewsThatMatchTheUsersDomains() {
  const token = await getTokenServerSide();

  const response =
    await projectServices.getProjectPreviewsThatMatchTheUsersDomains(
      token || ''
    );

  if (response.status === 401) redirect('/login');
  if (response.status === 200 && response.data) return response.data.previews;
  else throw new Error('Failed to fetch projects previews');
}

export default async function Dashboard() {
  const projectPreviewsThatMatchTheUsersDomains =
    await getProjectPreviewsThatMatchTheUsersDomains();

  return (
    <div className={styles.homePage}>
      <div className={styles.head}>
        <ProjectSearchSection />
      </div>
      <div className={styles.body}>
        <section className={styles.section}>
          <ProjectPreviewsSection
            title="Ces projets qui pourraient vous intéresser"
            projectPreviews={projectPreviewsThatMatchTheUsersDomains}
          />
        </section>
        <section className={styles.section}>
          <ProjectPreviewsThatTheUserOwnsSection />
        </section>
        <section className={styles.section}>
          <ProjectPreviewsOfWhichTheUserIsAMemberSection />
        </section>
      </div>
    </div>
  );
}
