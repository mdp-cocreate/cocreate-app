import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import styles from './Breadcrumb.module.scss';

import { labelForPath } from '@/constants/labelForPath';

import { getLabelBySlug } from '@/utils/getLabelBySlug';

export const Breadcrumb = () => {
  const pathname = usePathname();

  const pathnameSplitted = pathname.split('/').filter((p) => p !== '');

  if (!pathnameSplitted?.length)
    return (
      <ul className={styles.breadcrumb}>
        <li className={styles.item}>
          <Link href="/" className={styles.active}>
            Accueil
          </Link>
        </li>
      </ul>
    );

  const getLabelByPath = (path: string) => {
    const itemFound = labelForPath.find((item) => item.path === path);
    return itemFound?.label;
  };

  const renderBreadcrumbItemByPath = (path: string, index: number) => {
    const isCurrentPath = index + 1 === pathnameSplitted.length;

    const href = '/' + pathnameSplitted.slice(0, index + 1).join('/');

    const labelByPath = getLabelByPath(path);

    return (
      <li className={styles.item}>
        <Link href={href} className={isCurrentPath ? styles.active : ''}>
          {labelByPath ? labelByPath : getLabelBySlug(path)}
        </Link>
      </li>
    );
  };

  return (
    <ul className={styles.breadcrumb}>
      <li className={styles.item}>
        <Link href="/">Accueil</Link>
      </li>
      {pathnameSplitted.map((path, index) => (
        <React.Fragment key={index}>
          {renderBreadcrumbItemByPath(path, index)}
        </React.Fragment>
      ))}
    </ul>
  );
};
