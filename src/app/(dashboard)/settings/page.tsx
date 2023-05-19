import { Metadata } from 'next';

import styles from './page.module.scss';

import { Section } from '@/components/molecules/Section/Section';

export const metadata: Metadata = {
  title: 'Paramètres',
  description: 'Modifiez les paramètres et données de votre compte',
};

export default function Settings() {
  return (
    <div className={styles.settingsPage}>
      <h1 className={styles.heading}>Paramètres</h1>
      <div className={styles.body}>
        <Section title="Profil">Profil</Section>
        <Section title="Informations de connexion">
          Informations de connexion
        </Section>
      </div>
    </div>
  );
}
