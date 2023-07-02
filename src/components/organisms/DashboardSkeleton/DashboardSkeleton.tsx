'use client';

import { PropsWithChildren, useState } from 'react';

import { CreateProjectDrawer } from '../CreateProjectDrawer/CreateProjectDrawer';
import styles from './DashboardSkeleton.module.scss';

import { SideBar } from '@/components/organisms/SideBar/SideBar';
import { TopBar } from '@/components/organisms/TopBar/TopBar';

import { DomainModel } from '@/models/appModels';

interface Props {
  domains: DomainModel[];
}

export const DashboardSkeleton = ({
  children,
  domains,
}: PropsWithChildren<Props>) => {
  const [isCreateProjectDrawerOpened, setIsCreateProjectDrawerOpened] =
    useState(false);

  return (
    <>
      <div className={styles.dashboardSkeleton}>
        <header className={styles.header}>
          <TopBar
            setIsCreateProjectDrawerOpened={setIsCreateProjectDrawerOpened}
          />
        </header>
        <div className={styles.body}>
          <aside className={styles.aside}>
            <SideBar domains={domains} />
          </aside>
          <main className={styles.page}>{children}</main>
        </div>
      </div>
      <CreateProjectDrawer
        open={isCreateProjectDrawerOpened}
        setOpen={setIsCreateProjectDrawerOpened}
      />
    </>
  );
};
