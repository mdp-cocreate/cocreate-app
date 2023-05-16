import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { getTokenServerSide } from '@/utils/getTokenServerSide';

import { projectServices } from '@/services/projectServices';

interface Params {
  params: { slug: string };
}

async function getProjectMetadata(slug: string) {
  const response = await projectServices.getProjectMetadata(slug);

  if (response.status === 404) notFound();
  if (response.status === 200 && response.data) return response.data;
  else throw new Error('Failed to generate project metadata');
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { metadata } = await getProjectMetadata(params.slug);

  const { name, shortDescription } = metadata;

  const thisPageMetadata: Metadata = {
    title: name,
    description: shortDescription,
  };

  return thisPageMetadata;
}

async function getProjectBySlug(slug: string) {
  const token = await getTokenServerSide();
  const response = await projectServices.getProjectBySlug(token || '', slug);

  if (response.status === 401) redirect('/login');
  if (response.status === 404) notFound();
  if (response.status === 200 && response.data) return response.data;
  else throw new Error('Failed to fetch project by slug');
}

export default async function Project({ params }: Params) {
  const { project, currentUserRole } = await getProjectBySlug(params.slug);

  return (
    <h1>
      {project.name} {currentUserRole}
    </h1>
  );
}
