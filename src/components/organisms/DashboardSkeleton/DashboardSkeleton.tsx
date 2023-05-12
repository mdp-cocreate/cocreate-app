import { PropsWithChildren } from 'react';

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
  return (
    <div className={styles.dashboardSkeleton}>
      <header className={styles.header}>
        <TopBar />
      </header>
      <div className={styles.body}>
        <aside className={styles.aside}>
          <SideBar domains={domains} />
        </aside>
        <main className={styles.page}>{children}</main>
      </div>
    </div>
  );
};
