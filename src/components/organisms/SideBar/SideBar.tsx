'use client';

import { useRouter } from 'next/navigation';

import styles from './SideBar.module.scss';

import { ArtIcon } from '@/components/atoms/icons/ArtIcon/ArtIcon';
import { ChartIcon } from '@/components/atoms/icons/ChartIcon/ChartIcon';
import { CodeIcon } from '@/components/atoms/icons/CodeIcon/CodeIcon';
import { DataIcon } from '@/components/atoms/icons/DataIcon/DataIcon';
import { DevicesIcon } from '@/components/atoms/icons/DevicesIcon/DevicesIcon';
import { LockIcon } from '@/components/atoms/icons/LockIcon/LockIcon';
import { LogOutIcon } from '@/components/atoms/icons/LogOutIcon/LogOutIcon';
import { PaintIcon } from '@/components/atoms/icons/PaintIcon/PaintIcon';
import { SettingsIcon } from '@/components/atoms/icons/SettingsIcon/SettingsIcon';
import { SideBarLink } from '@/components/molecules/SideBarLink/SideBarLink';

import { Domain } from '@/models/AppModels';

export const SideBar = () => {
  const router = useRouter();

  const logOut = () => {
    // manageToken.remove();
    router.push('/login');
  };

  const getHrefByCategoryName = (name: Domain) => {
    switch (name) {
      case Domain.UXUI_DESIGN:
        return '/uxui-design';
      case Domain.DEVELOPMENT:
        return '/development';
      case Domain.GRAPHIC_DESIGN:
        return '/graphic-design';
      case Domain.WEBMARKETING:
        return '/webmarketing';
      case Domain.CYBERSECURITY:
        return '/cybersecurity';
      case Domain.DATA:
        return '/data';
      case Domain.AUDIOVISUAL:
        return '/audiovisual';
      default:
        return '';
    }
  };

  const getIconByCategoryName = (
    name: Domain
  ): React.SVGProps<SVGSVGElement> => {
    switch (name) {
      case Domain.UXUI_DESIGN:
        return <DevicesIcon />;
      case Domain.DEVELOPMENT:
        return <CodeIcon />;
      case Domain.GRAPHIC_DESIGN:
        return <PaintIcon />;
      case Domain.WEBMARKETING:
        return <ChartIcon />;
      case Domain.CYBERSECURITY:
        return <LockIcon />;
      case Domain.DATA:
        return <DataIcon />;
      case Domain.AUDIOVISUAL:
        return <ArtIcon />;
    }
  };

  const getLabelByCategoryName = (name: Domain) => {
    switch (name) {
      case Domain.UXUI_DESIGN:
        return 'UX/UI design';
      case Domain.DEVELOPMENT:
        return 'Développement';
      case Domain.GRAPHIC_DESIGN:
        return 'Graphisme';
      case Domain.WEBMARKETING:
        return 'Webmarketing';
      case Domain.CYBERSECURITY:
        return 'Cybersécurité';
      case Domain.DATA:
        return 'Data';
      case Domain.AUDIOVISUAL:
        return 'Audiovisuel';
      default:
        return '';
    }
  };

  return (
    <nav className={styles.sideBar}>
      <ul className={styles.categoryList}>
        {[].map(({ id, name }) => (
          <SideBarLink
            href={getHrefByCategoryName(name)}
            icon={getIconByCategoryName(name)}
            category={name}
            key={id}
          >
            {getLabelByCategoryName(name)}
          </SideBarLink>
        ))}
      </ul>
      <ul className={styles.settings}>
        <SideBarLink href="/settings" icon={<SettingsIcon />}>
          Paramètres
        </SideBarLink>
        <SideBarLink
          onClick={logOut}
          icon={<LogOutIcon />}
          category="alert"
          href="/login"
        >
          Se déconnecter
        </SideBarLink>
      </ul>
    </nav>
  );
};
