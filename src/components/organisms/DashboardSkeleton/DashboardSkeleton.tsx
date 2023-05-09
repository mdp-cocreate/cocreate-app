import { PropsWithChildren } from 'react';

import styles from './DashboardSkeleton.module.scss';

import { SideBar } from '@/components/organisms/SideBar/SideBar';
import { TopBar } from '@/components/organisms/TopBar/TopBar';

export const DashboardSkeleton = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.dashboardSkeleton}>
      <header className={styles.header}>
        <TopBar />
      </header>
      <div className={styles.body}>
        <aside className={styles.aside}>
          <SideBar />
        </aside>
        <main className={styles.page}>{children}</main>
      </div>
    </div>
  );
};
