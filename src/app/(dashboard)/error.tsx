'use client';

import { useEffect } from 'react';

import { Button } from '@/components/atoms/Button/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, []);

  return (
    <div>
      <h2>Something went wrong! {error.message}</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
