import React, { useEffect, useState } from 'react';

import styles from './TextualCheckbox.module.scss';

import { capitalize } from '@/utils/capitalize';
import { getLabelByDomain } from '@/utils/getLabelByDomain';

import { Domain } from '@/models/appModels';

interface Props {
  domain?: Domain;
  label?: string;
  onChange: (checked: boolean) => void;
}

export const TextualCheckbox = ({ domain, label, onChange }: Props) => {
  const [checked, setChecked] = useState(false);

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

  useEffect(() => {
    onChange(checked);
  }, [checked]);

  return (
    <div className={styles.textualCheckbox}>
      <input
        type="checkbox"
        id={domain || label}
        className={styles.input}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label
        htmlFor={domain || label}
        className={`${styles.label} ${domain ? getColorByDomain() : ''}`}
      >
        {domain
          ? getLabelByDomain(domain)
          : label
          ? capitalize(label?.replace('_', ' ').toLowerCase())
          : ''}
      </label>
    </div>
  );
};
