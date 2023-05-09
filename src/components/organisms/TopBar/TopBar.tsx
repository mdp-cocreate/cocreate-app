'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './TopBar.module.scss';

import { isLinkActive } from '@/utils/isLinkActive';

import { Button } from '@/components/atoms/Button/Button';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import { HelpIcon } from '@/components/atoms/icons/HelpIcon/HelpIcon';
import { HomeIcon } from '@/components/atoms/icons/HomeIcon/HomeIcon';
import { NotificationsIcon } from '@/components/atoms/icons/NotificationsIcon/NotificationsIcon';
import { ProfileIcon } from '@/components/atoms/icons/ProfileIcon/ProfileIcon';
import { Breadcrumb } from '@/components/molecules/Breadcrumb/Breadcrumb';

export const TopBar = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.topBar}>
      <ul className={styles.iconButtonsContainer}>
        <li>
          <Link
            href="/"
            style={
              isLinkActive(pathname, '/')
                ? { pointerEvents: 'none' }
                : undefined
            }
          >
            <IconButton
              icon={<HomeIcon />}
              active={isLinkActive(pathname, '/')}
              focusable={false}
            />
          </Link>
        </li>
        <li>
          <IconButton icon={<NotificationsIcon />} />
        </li>
        <li>
          <IconButton icon={<ProfileIcon />} />
        </li>
      </ul>
      <div className={styles.breadcrumbContainer}>
        <Breadcrumb />
      </div>
      <ul className={styles.callToActionContainer}>
        <li>
          <Button>Émettre un projet</Button>
        </li>
        <li>
          <IconButton icon={<HelpIcon />} />
        </li>
      </ul>
    </nav>
  );
};
