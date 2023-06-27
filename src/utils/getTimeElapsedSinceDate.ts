export const getTimeElapsedSinceDate = (date: Date | string): string => {
  const now = new Date();

  const seconds = Math.floor(
    (now.getTime() - new Date(date).getTime()) / 1000
  ) as number;
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) return `il y a ${interval} an${interval === 1 ? '' : 's'}`;
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `il y a ${interval} mois`;
  interval = Math.floor(seconds / 86400);
  if (interval >= 1)
    return `il y a ${interval} jour${interval === 1 ? '' : 's'}`;
  interval = Math.floor(seconds / 3600);
  if (interval >= 1)
    return `il y a ${interval} heure${interval === 1 ? '' : 's'}`;
  interval = Math.floor(seconds / 60);
  if (interval >= 1)
    return `il y a ${interval} minute${interval === 1 ? '' : 's'}`;
  return `à l'instant`;
};
