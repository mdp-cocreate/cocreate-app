import React from 'react';

import styles from './DomainTag.module.scss';

import { getLabelByDomain } from '@/utils/getLabelByDomain';

import { Domain } from '@/models/appModels';

type Props = {
  domain: Domain;
};

export const DomainTag = ({ domain }: Props) => {
  const getColorByDomain = () => {
    switch (domain) {
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
    <div className={`${styles.domainTag} ${getColorByDomain()}`}>
      {getLabelByDomain(domain)}
    </div>
  );
};
