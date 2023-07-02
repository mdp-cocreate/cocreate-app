'use client';

import { useRouter } from 'next/navigation';

import styles from './SideBar.module.scss';

import { getIconByDomain } from '@/utils/getIconByDomain';
import { getLabelByDomain } from '@/utils/getLabelByDomain';
import { manageToken } from '@/utils/manageToken';

import { SettingsIcon } from '@/components/atoms/icons/SettingsIcon/SettingsIcon';
import { SideBarLink } from '@/components/molecules/SideBarLink/SideBarLink';

import { DomainModel } from '@/models/appModels';

interface Props {
  domains: DomainModel[];
}

export const SideBar = ({ domains }: Props) => {
  const router = useRouter();

  const logout = () => {
    manageToken.remove();
    router.refresh();
  };

  return (
    <nav className={styles.sideBar}>
      <ul className={styles.categoryList}>
        {domains.map(({ id, name }) => (
          <SideBarLink
            href={`/search?domains=${name.toLowerCase()}`}
            icon={getIconByDomain(name)}
            category={name}
            key={id}
          >
            {getLabelByDomain(name)}
          </SideBarLink>
        ))}
      </ul>
      <ul className={styles.settings}>
        <SideBarLink href="/settings" icon={<SettingsIcon />}>
          Paramètres
        </SideBarLink>
        <SideBarLink
          onClick={logout}
          icon={<LogoutIcon />}
          category="alert"
          href="/login"
        >
          Se déconnecter
        </SideBarLink>
      </ul>
    </nav>
  );
};
