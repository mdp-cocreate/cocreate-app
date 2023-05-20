'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import styles from './page.module.scss';

import { manageToken } from '@/utils/manageToken';

import { projectServices } from '@/services/projectServices';

import { ProjectPreviewCard } from '@/components/molecules/ProjectPreviewCard/ProjectPreviewCard';
import { Grid } from '@/components/organisms/Grid/Grid';
import { ProjectSearchSection } from '@/components/organisms/ProjectSearchSection/ProjectSearchSection';

import { Domain, Skill } from '@/models/appModels';
import { ProjectPreview } from '@/models/projectModels';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query') || undefined;
  const domainsParam =
    (searchParams.get('domains')?.toUpperCase().split(',') as Domain[]) ||
    undefined;
  const skillsParam =
    (searchParams.get('skills')?.toUpperCase().split(',') as Skill[]) ||
    undefined;

  const [searchResultsTitle, setSearchResultsTitle] =
    useState('Projets trouvés');
  const [projectsFound, setProjectsFound] = useState<ProjectPreview[]>([]);

  const getSearchedProjects = async (
    e: React.FormEvent<HTMLFormElement>,
    foundResultsCount: number,
    searchQuery?: string,
    selectedDomains?: Domain[]
  ) => {
    e?.preventDefault();

    const token = manageToken.get();

    const response = await projectServices.getSearchedProjects({
      token: token || '',
      query: searchQuery,
      domains: selectedDomains,
      skills: skillsParam,
    });

    if (response.status === 401) {
      router.refresh();
      return;
    }

    if (response.status === 200 && response.data) {
      setProjectsFound(response.data.projects);

      setSearchResultsTitle(
        `${foundResultsCount} projet${foundResultsCount > 1 ? 's' : ''} trouvé${
          foundResultsCount > 1 ? 's' : ''
        }`
      );
    }
  };

  const getQueryParamsSearchedProjects = async () => {
    const token = manageToken.get();

    const response = await projectServices.getSearchedProjects({
      token: token || '',
      query: queryParam,
      domains: domainsParam,
      skills: skillsParam,
    });

    if (response.status === 401) {
      router.refresh();
      return;
    }

    if (response.status === 200 && response.data)
      setProjectsFound(response.data.projects);
  };

  useEffect(() => {
    if (queryParam || domainsParam.length || skillsParam.length)
      getQueryParamsSearchedProjects();
  }, [searchParams]);

  return (
    <div className={styles.searchPage}>
      <div className={styles.head}>
        <ProjectSearchSection
          onSubmit={getSearchedProjects}
          searchQueryDefaultValue={queryParam}
          selectedDomainsDefaultValue={domainsParam}
        />
      </div>
      <section className={styles.body}>
        <h2 className={styles.title}>{searchResultsTitle}</h2>
        <Grid>
          {projectsFound.length ? (
            projectsFound.map((project) => (
              <ProjectPreviewCard
                fill
                key={project.id}
                projectPreview={project}
              />
            ))
          ) : (
            <span>Aucun projet trouvé</span>
          )}
        </Grid>
      </section>
    </div>
  );
}
