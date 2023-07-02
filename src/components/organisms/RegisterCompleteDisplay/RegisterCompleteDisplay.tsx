import Image from 'next/image';
import React from 'react';

import styles from './RegisterCompleteDisplay.module.scss';

export const RegisterCompleteDisplay = () => {
  return (
    <div className={styles.registerCompleteDisplay}>
      <section className={styles.content}>
        <figure className={styles.figure}>
          <Image
            src="/registerCompleteIllustration.svg"
            alt="Register complete illustration"
            fill
            style={{ objectFit: 'contain', objectPosition: 'center' }}
          />
        </figure>
        <h1>Votre compte a bien été créé !</h1>
        <p>
          Plus qu&apos;une seule étape ! Nous vous avons envoyé un mail de
          confirmation afin de valider votre compte
        </p>
      </section>
    </div>
  );
};
