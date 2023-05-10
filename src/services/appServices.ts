import { DomainModel } from '@/models/AppModels';

export const appServices = {
  async getDomains(): Promise<{
    status: number;
    data?: { domains: DomainModel[] };
  }> {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/domains`, {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok)
          return response.json().then((data: { domains: DomainModel[] }) => ({
            status: response.status,
            data,
          }));
        return { status: response.status };
      })
      .catch(() => ({ status: 500 }));
  },
};
