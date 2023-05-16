import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { getTokenServerSide } from '@/utils/getTokenServerSide';

import { userServices } from '@/services/userServices';

interface Params {
  params: { slug: string };
}

async function getUserMetadata(slug: string) {
  const response = await userServices.getProjectMetadata(slug);

  if (response.status === 404) notFound();
  if (response.status === 200 && response.data) return response.data;
  else throw new Error('Failed to generate user metadata');
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
    <h1>
      {user.firstName} {isItTheUserHimself && 'My profile'}
    </h1>
  );
}
