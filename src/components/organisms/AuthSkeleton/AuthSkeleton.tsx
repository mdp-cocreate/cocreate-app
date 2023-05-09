import { PropsWithChildren } from 'react';

import Image from 'next/image';

import styles from './AuthSkeleton.module.scss';

export const AuthSkeleton = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.authSkeleton}>
      <main className={styles.page}>{children}</main>
      <aside className={styles.aside}>
        <Image
          src="/authIllustration.png"
          alt="Auth illustration"
          priority={true}
          fill
          style={{ objectFit: 'cover' }}
        />
      </aside>
    </div>
  );
};
