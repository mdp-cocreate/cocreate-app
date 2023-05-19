'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import styles from './TopBar.module.scss';

import { isLinkActive } from '@/utils/isLinkActive';
import { manageToken } from '@/utils/manageToken';

import { userServices } from '@/services/userServices';

import { Button } from '@/components/atoms/Button/Button';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import { HelpIcon } from '@/components/atoms/icons/HelpIcon/HelpIcon';
import { HomeIcon } from '@/components/atoms/icons/HomeIcon/HomeIcon';
import { NotificationsIcon } from '@/components/atoms/icons/NotificationsIcon/NotificationsIcon';
import { ProfileIcon } from '@/components/atoms/icons/ProfileIcon/ProfileIcon';
import { Breadcrumb } from '@/components/molecules/Breadcrumb/Breadcrumb';

export const TopBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [currentUserSlug, setCurrentUserSlug] = useState<string | null>(null);

  async function getCurrentUserProfile(token: string) {
    const response = await userServices.getCurrentUserProfile(token);

    if (response.status === 401) router.refresh();
    if (response.status === 200 && response.data) return response.data;
    else throw new Error('Failed to fetch current user profile');
  }

  useEffect(function retrieveCurrentUserSlug() {
    const token = manageToken.get();
    if (!token) router.refresh();
    else
      getCurrentUserProfile(token)
        .then(({ user }) => setCurrentUserSlug(user.slug))
        .catch(() => router.refresh());
  }, []);

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
        {currentUserSlug ? (
          <li>
            <Link
              href={`/users/${currentUserSlug}`}
              style={
                isLinkActive(pathname, `/users/${currentUserSlug}`)
                  ? { pointerEvents: 'none' }
                  : undefined
              }
            >
              <IconButton
                icon={<ProfileIcon />}
                active={isLinkActive(pathname, `/users/${currentUserSlug}`)}
                focusable={false}
              />
            </Link>
          </li>
        ) : null}
      </ul>
      <div className={styles.breadcrumbContainer}>
        <Breadcrumb />
      </div>
      <ul className={styles.callToActionContainer}>
        <li>
          <Button>Créer un projet</Button>
        </li>
        <li>
          <IconButton icon={<HelpIcon />} />
        </li>
      </ul>
    </nav>
  );
};
