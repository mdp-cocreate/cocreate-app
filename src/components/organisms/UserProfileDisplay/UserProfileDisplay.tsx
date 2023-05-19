import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import styles from './UserProfileDisplay.module.scss';

import { Button } from '@/components/atoms/Button/Button';
import { Section } from '@/components/molecules/Section/Section';
import { UserInformations } from '@/components/molecules/UserInformations/UserInformations';

import { UserProfile } from '@/models/userModels';

type Props = {
  user: UserProfile;
  isItTheUserHimself?: boolean;
};

export const UserProfileDisplay = ({
  user,
  isItTheUserHimself = false,
}: Props) => {
  const { profilePicture, firstName, lastName, registeredAt, skills } = user;

  const domains = Array.from(new Set(skills.map((skill) => skill.domain.name)));

  const fullName = firstName + ' ' + lastName;

  return (
    <div className={styles.userProfileDisplay}>
      <div className={styles.head}>
        <figure className={styles.profilePictureContainer}>
          {/* handle default pp */}
          <Image
            src={profilePicture || 'default'}
            alt={`${fullName}'s profile picture`}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </figure>
        <h1 className={styles.name}>{fullName}</h1>
        {isItTheUserHimself ? (
          <span>
            <Link href="/settings" style={{ display: 'inline-flex' }}>
              <Button color="secondary" focusable={false}>
                Modifier mon profil
              </Button>
            </Link>
          </span>
        ) : null}
      </div>
      <div className={styles.body}>
        <Section title="A propos">
          <UserInformations
            registeredAt={registeredAt}
            skills={skills.map((skill) => skill.name)}
            domains={domains}
          />
        </Section>
      </div>
    </div>
  );
};
