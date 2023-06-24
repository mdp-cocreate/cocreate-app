import React, { PropsWithChildren } from 'react';

import styles from './ErrorWidget.module.scss';

import { ErrorIcon } from '@/components/atoms/icons/ErrorIcon/ErrorIcon';

export const ErrorWidget = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.errorWidget}>
      <div className={styles.iconContainer}>
        <ErrorIcon />
      </div>
      <p className={styles.content}>{children}</p>
    </div>
  );
};
