import React, { useEffect, useState } from 'react';

import { v4 as uuid } from 'uuid';

import styles from './TextualCheckbox.module.scss';

import { capitalize } from '@/utils/capitalize';
import { getLabelByDomain } from '@/utils/getLabelByDomain';

import { Domain } from '@/models/appModels';

interface Props {
  domain?: Domain;
  label?: string;
  defaultChecked?: boolean;
  onChange: (checked: boolean) => void;
}

export const TextualCheckbox = ({
  domain,
  label,
  defaultChecked = false,
  onChange,
}: Props) => {
  const [checked, setChecked] = useState(defaultChecked);

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

  const id = uuid();

  return (
    <div className={styles.textualCheckbox}>
      <input
        type="checkbox"
        id={id}
        className={styles.input}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label
        htmlFor={id}
        className={`${styles.label} ${domain ? getColorByDomain() : ''}`}
      >
        {domain
          ? getLabelByDomain(domain)
          : label
          ? capitalize(label?.replaceAll('_', ' ').toLowerCase())
          : ''}
      </label>
    </div>
  );
};
