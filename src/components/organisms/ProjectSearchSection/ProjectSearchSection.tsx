'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import styles from './ProjectSearchSection.module.scss';

import { getLabelByDomain } from '@/utils/getLabelByDomain';
import { manageToken } from '@/utils/manageToken';

import { appServices } from '@/services/appServices';
import { projectServices } from '@/services/projectServices';

import { Button } from '@/components/atoms/Button/Button';
import { TextField } from '@/components/molecules/Field/TextField/TextField';

import { Domain, DomainModel } from '@/models/appModels';

type Props = {
  onSubmit?: (
    e: React.FormEvent<HTMLFormElement>,
    foundResultsCount: number,
    searchQuery: string,
    selectedDomains: Domain[]
  ) => void;
  searchQueryDefaultValue?: string;
  selectedDomainsDefaultValue?: Domain[];
};

export const ProjectSearchSection = ({
  onSubmit,
  searchQueryDefaultValue = '',
  selectedDomainsDefaultValue = [],
}: Props) => {
  const router = useRouter();

  const [domains, setDomains] = useState<DomainModel[]>([]);

  const [searchQuery, setSearchQuery] = useState(searchQueryDefaultValue);
  const [selectedDomains, setSelectedDomains] = useState<Domain[]>(
    selectedDomainsDefaultValue
  );

  const [foundResultsCount, setFoundResultsCount] = useState<number>(0);

  const getDomains = async () => {
    const response = await appServices.getDomains();

    if (response.status === 200 && response.data)
      setDomains(response.data.domains);
  };

  useEffect(() => {
    getDomains();
  }, []);

  const buttonLabel = !foundResultsCount
    ? 'Aucun projet'
    : foundResultsCount === 1
    ? 'Voir le projet'
    : `Voir les ${foundResultsCount} projets`;

  const getFoundResultsCount = async () => {
    const token = manageToken.get();

    const response = await projectServices.getSearchedProjectsCount({
      token: token || '',
      query: searchQuery,
      domains: selectedDomains,
    });

    if (response.status === 401) {
      router.refresh();
      return;
    }

    if (response.status === 200 && response.data)
      setFoundResultsCount(response.data.count);
  };

  useEffect(
    function getFoundResultsCountAfterTimeout() {
      let timer: NodeJS.Timeout;

      const delaySearch = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          getFoundResultsCount();
        }, 500);
      };

      delaySearch();

      return () => {
        clearTimeout(timer);
      };
    },
    [searchQuery, selectedDomains]
  );

  const redirectIntoSearchPage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const queriesArray = [];

    if (searchQuery) queriesArray.push(`query=${searchQuery}`);
    if (selectedDomains.length)
      queriesArray.push(`domains=${selectedDomains.join(',').toLowerCase()}`);

    if (!queriesArray.length) {
      router.push('/search');
      return;
    }

    const queries = `?${queriesArray.join('&')}`;
    router.push(`/search${queries}`);
  };

  return (
    <section className={styles.projectSearchSection}>
      <h1 className={styles.title}>Vous cherchez un projet ?</h1>
      <form
        className={styles.form}
        onSubmit={
          onSubmit
            ? (e: React.FormEvent<HTMLFormElement>) =>
                onSubmit(e, foundResultsCount, searchQuery, selectedDomains)
            : redirectIntoSearchPage
        }
      >
        <TextField
          defaultValue={searchQueryDefaultValue}
          placeholder="Filtrer par mot-clé"
          maxLength={50}
          onValueChange={(value) => setSearchQuery(value)}
        />
        <ul className={styles.domainsCheckboxes}>
          {domains.map((domain) => (
            <li key={domain.id}>
              <input
                type="checkbox"
                id={domain.name}
                checked={selectedDomains.some(
                  (selectedDomain) => selectedDomain === domain.name
                )}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  if (isChecked)
                    setSelectedDomains([...selectedDomains, domain.name]);
                  else
                    setSelectedDomains(
                      selectedDomains.filter(
                        (selectDomain) => selectDomain !== domain.name
                      )
                    );
                }}
              />
              <label htmlFor={domain.name}>
                {getLabelByDomain(domain.name)}
              </label>
            </li>
          ))}
        </ul>
        <div className={styles.submitButtonContainer}>
          <Button type="submit" disabled={!foundResultsCount}>
            {buttonLabel}
          </Button>
        </div>
      </form>
    </section>
  );
};
