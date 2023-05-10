import { cookies } from 'next/headers';

import { manageToken } from './manageToken';

export async function getTokenServerSide(): Promise<string | undefined> {
  const cookiesList = cookies();
  const token = cookiesList.get(manageToken.key);
  return token?.value;
}
