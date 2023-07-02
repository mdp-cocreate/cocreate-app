import { Metadata } from 'next';

import styles from './page.module.scss';

import { Section } from '@/components/molecules/Section/Section';
import { ProfileForm } from '@/components/organisms/ProfileForm/ProfileForm';

export const metadata: Metadata = {
  title: 'Paramètres',
  description: 'Modifiez les paramètres et données de votre compte',
};

export default function Settings() {
  return (
    <div className={styles.settingsPage}>
      <h1 className={styles.heading}>Paramètres</h1>
      <div className={styles.body}>
        <Section title="Profil">
          <p style={{ marginBottom: '2rem' }}>Modifier votre photo de profil</p>
          <ProfileForm />
        </Section>
      </div>
    </div>
  );
}
