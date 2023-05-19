import { Metadata } from 'next';

import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Recherche',
  description: 'Trouvez le projet qui vous correspond',
};

export default function Search() {
  return <div className={styles.searchPage}>Search</div>;
}
