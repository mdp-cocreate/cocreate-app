import React, { PropsWithChildren } from 'react';

import styles from './Grid.module.scss';

export const Grid = ({ children }: PropsWithChildren) => {
  return <div className={styles.grid}>{children}</div>;
};
