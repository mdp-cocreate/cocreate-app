import React, { PropsWithChildren } from 'react';

import styles from './Field.module.scss';

import { capitalize } from '@/utils/capitalize';

interface Props {
  label: string;
}

export const Field = ({ label, children }: PropsWithChildren<Props>) => {
  return (
    <div className={styles.field}>
      <label className={`small ${styles.label}`} htmlFor={label}>
        {capitalize(label)}
      </label>
      <div className={styles.inputContainer}>{children}</div>
    </div>
  );
};
