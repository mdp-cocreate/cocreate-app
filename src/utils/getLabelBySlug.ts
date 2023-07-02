import { capitalize } from './capitalize';

export const getLabelBySlug = (slug: string): string => {
  if (slug.includes('-')) {
    return slug
      .split('-')
      .map((word) => capitalize(word))
      .join(' ');
  } else return capitalize(slug);
};
