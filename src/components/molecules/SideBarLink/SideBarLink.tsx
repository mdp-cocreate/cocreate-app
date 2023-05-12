import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

import styles from './SideBarLink.module.scss';

import { isLinkActive } from '@/utils/isLinkActive';

import { Domain } from '@/models/appModels';

interface Props {
  icon: React.SVGProps<SVGSVGElement>;
  href: string;
  disabled?: boolean;
  category?: 'primary' | 'alert' | Domain;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export const SideBarLink = ({
  icon,
  href,
  disabled = false,
  category = 'primary',
  children,
  onClick,
}: PropsWithChildren<Props>) => {
  const pathname = usePathname();

  const getColorByCategory = () => {
    switch (category) {
      case 'alert':
        return styles.alert;
      case Domain.UXUI_DESIGN:
        return styles.uiuxDesign;
      case Domain.DEVELOPMENT:
        return styles.development;
      case Domain.GRAPHIC_DESIGN:
        return styles.graphicDesign;
      case Domain.WEBMARKETING:
        return styles.webmarketing;
      case Domain.CYBERSECURITY:
        return styles.cybersecurity;
      case Domain.DATA:
        return styles.data;
      case Domain.AUDIOVISUAL:
        return styles.audiovisual;
      default:
        return '';
    }
  };

  return (
    <Link
      href={href}
      className={`${styles.sideBarLink} ${
        isLinkActive(pathname, href) ? styles.active : ''
      } ${disabled ? styles.disabled : ''} ${getColorByCategory()}`}
      onClick={
        onClick
          ? (e) => {
              e.preventDefault();
              onClick(e);
            }
          : undefined
      }
    >
      <>{icon}</>
      <span className={styles.text}>{children}</span>
    </Link>
  );
};
