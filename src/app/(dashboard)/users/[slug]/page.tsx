import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import styles from './page.module.scss';

import { getTokenServerSide } from '@/utils/getTokenServerSide';

import { userServices } from '@/services/userServices';

import { ProjectPreviewsOfWhichTheUserIsAMemberSection } from '@/components/organisms/ProjectPreviewsSection/ProjectPreviewsOfWhichTheUserIsAMemberSection/ProjectPreviewsOfWhichTheUserIsAMemberSection';
import { ProjectPreviewsThatTheUserOwnsSection } from '@/components/organisms/ProjectPreviewsSection/ProjectPreviewsThatTheUserOwnsSection/ProjectPreviewsThatTheUserOwnsSection';

interface Params {
  params: { slug: string };
}

async function getUserMetadata(slug: string) {
  const response = await userServices.getProjectMetadata(slug);

  if (response.status === 404) notFound();
  if (response.status === 200 && response.data) return response.data;
  else throw new Error('Failed to fetch user metadata');
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { metadata } = await getUserMetadata(params.slug);

  const { firstName, lastName } = metadata;

  const thisPageMetadata: Metadata = {
    title: `${firstName} ${lastName}`,
  };

  return thisPageMetadata;
}

async function getUserProfileBySlug(slug: string) {
  const token = await getTokenServerSide();
  const response = await userServices.getUserProfileBySlug(token || '', slug);

  if (response.status === 401) redirect('/login');
  if (response.status === 404) notFound();
  if (response.status === 200 && response.data) return response.data;
  else throw new Error('Failed to fetch user by slug');
}

export default async function User({ params }: Params) {
  const { user, isItTheUserHimself } = await getUserProfileBySlug(params.slug);

  return (
    <div className={styles.userPage}>
      <h1>
        {user.firstName} {isItTheUserHimself && 'My profile'}
      </h1>
      <div className={styles.body}>
        <section className={styles.section}>
          <ProjectPreviewsThatTheUserOwnsSection
            userId={isItTheUserHimself ? undefined : user.id}
          />
        </section>
        <section className={styles.section}>
          <ProjectPreviewsOfWhichTheUserIsAMemberSection
            userId={isItTheUserHimself ? undefined : user.id}
          />
        </section>
      </div>
    </div>
  );
}
