import { fetchWithApiKey } from './fetchWithApiKey';

import { RegisterDto } from '@/models/authModels';
import { RetrievedUserProfile, User, UserMetadata } from '@/models/userModels';

export const userServices = {
  async getUserProfileBySlug(
    token: string,
    slug: string
  ): Promise<{ status: number; data?: RetrievedUserProfile }> {
    return fetchWithApiKey(`${process.env.NEXT_PUBLIC_API_URL}/users/${slug}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok)
          return response.json().then((data: RetrievedUserProfile) => ({
            status: response.status,
            data,
          }));
        return { status: response.status };
      })
      .catch(() => ({ status: 500 }));
  },

  async getUserMetadata(slug: string): Promise<{
    status: number;
    data?: {
      metadata: UserMetadata;
    };
  }> {
    return fetchWithApiKey(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${slug}/metadata`,
      {
        method: 'GET',
      }
    )
      .then((response) => {
        if (response.ok)
          return response.json().then((data: { metadata: UserMetadata }) => ({
            status: response.status,
            data,
          }));
        return { status: response.status };
      })
      .catch(() => ({ status: 500 }));
  },

  async getCurrentUserProfile(token: string): Promise<{
    status: number;
    data?: {
      user: User;
    };
  }> {
    return fetchWithApiKey(`${process.env.NEXT_PUBLIC_API_URL}/users/current`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok)
          return response.json().then((data: { metadata: User }) => ({
            status: response.status,
            data,
          }));
        return { status: response.status };
      })
      .catch(() => ({ status: 500 }));
  },

  async updateUserProfile(
    token: string,
    updateUserDto: Partial<RegisterDto>
  ): Promise<{
    status: number;
    data?: {
      user: RetrievedUserProfile;
    };
  }> {
    return fetchWithApiKey(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateUserDto),
    })
      .then((response) => {
        if (response.ok)
          return response
            .json()
            .then((data: { user: RetrievedUserProfile }) => ({
              status: response.status,
              data,
            }));
        return { status: response.status };
      })
      .catch(() => ({ status: 500 }));
  },
};
