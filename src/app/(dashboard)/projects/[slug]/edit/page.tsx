'use client';

import { useParams, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import styles from './page.module.scss';

import { manageToken } from '@/utils/manageToken';

import { projectServices } from '@/services/projectServices';
import { CreateProjectDto, Project } from '@/models/projectModels';
import { Role } from '@/models/appModels';
import { TextField } from '@/components/molecules/Field/TextField/TextField';
import { Button } from '@/components/atoms/Button/Button';

interface Params {
  params: { slug: string };
}

export default async function Project() {
  const router = useRouter();
  const params = useParams();

  const [error, setError] = useState<ReactNode | string>('');
  const [project, setProject] = useState<Partial<CreateProjectDto> | null>(null);

  const [currentUserRole, setCurrentUserRole] = useState<Role | null>(null);

  useEffect(() => {
    const retrieveProject = async () => {
      if (!params.slug) return;

      const token = manageToken.get();

      const response = await projectServices.getProjectBySlug(
        token || '',
        params.slug
      );

      if (response.status === 401) router.push('/login');
      else if (response.status === 404) router.push('/');
      else if (response.status === 200 && response.data) {
        setProject({
          name: response.data.project.name,
          shortDescription: response.data.project.shortDescription,
          description: response.data.project.description || undefined,
        })
        setCurrentUserRole(response.data.currentUserRole)
      } else setError('Failed to fetch project by slug');
    };
    retrieveProject()
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!project) return

    const token = manageToken.get()
    const response = await projectServices.updateProjectBySlug(token || '', params.slug, project)

    if (response.status === 200) router.push(`/projects/${params.slug}`)
    else console.error(response.status)
  }

  if (!project) return null;

  return <div className={styles.editProjectPage}>
    <form onSubmit={handleSubmit} className={styles.editForm}>
      <TextField label='Nom' defaultValue={project.name} onValueChange={(value) => {setProject({...project, name: value})}} />
      <TextField label='Courte description' defaultValue={project.shortDescription} onValueChange={(value) => {setProject({...project, shortDescription: value})}} />
      <TextField label='Description' defaultValue={project.description || ''} onValueChange={(value) => {setProject({...project, description: value})}} />
      <Button type='submit'>Modifier</Button>
    </form>
  </div>;
}
