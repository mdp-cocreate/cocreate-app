'use client';

import { useEffect } from 'react';

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
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
