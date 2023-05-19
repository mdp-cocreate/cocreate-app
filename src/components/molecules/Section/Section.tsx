import React, { PropsWithChildren } from 'react';

import styles from './Section.module.scss';

type Props = {
  title: string;
};

export const Section = ({ title, children }: PropsWithChildren<Props>) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <article>{children}</article>
    </section>
  );
};
