import { DomainModel } from '@/models/AppModels';

export const appServices = {
  async getDomains(): Promise<{ status: number; data?: DomainModel[] }> {
    return fetch(`http://localhost:3001/domains`, {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok)
          return response.json().then((data: { domains: DomainModel[] }) => ({
            status: response.status,
            data: data.domains,
          }));
        else return { status: response.status };
      })
      .catch(() => ({ status: 500 }));
  },
};
