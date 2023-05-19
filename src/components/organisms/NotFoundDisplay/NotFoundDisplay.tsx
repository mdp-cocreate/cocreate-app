import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import styles from './NotFoundDisplay.module.scss';

import { Button } from '@/components/atoms/Button/Button';

type Props = {
  button?: {
    label: string;
    href: string;
  };
};

export const NotFoundDisplay = ({ button }: Props) => {
  return (
    <div className={styles.notFoundDisplay}>
      <section className={styles.content}>
        <h1>Page non trouvée</h1>
        <p className="text">
          Désolé, il semblerait que la page que vous recherchez n&apos;a pas pu
          être trouvée.
          <br />
          Erreur 404.
        </p>
        {button ? (
          <span>
            <Link href={button.href} style={{ display: 'inline-flex' }}>
              <Button focusable={false}>{button.label}</Button>
            </Link>
          </span>
        ) : null}
      </section>
      <figure className={styles.illustrationContainer}>
        <Image
          src="/notFoundIllustration.svg"
          alt="Not found illustration"
          fill
          style={{ objectFit: 'contain' }}
        />
      </figure>
    </div>
  );
};
