import {
  ProjectMetadata,
  ProjectPreview,
  RetrievedCompleteProject,
} from '@/models/projectModels';

export const projectServices = {
  async getAllProjectSlugs(): Promise<{
    status: number;
    data?: { slugs: { slug: string }[] };
  }> {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok)
          return response
            .json()
            .then((data: { slugs: { slug: string }[] }) => ({
              status: response.status,
              data,
            }));
        return { status: response.status };
      })
      .catch(() => ({ status: 500 }));
  },

  async getProjectPreviewsThatMatchTheUsersDomains(
    token: string,
    skip = 0,
    take = 5
  ): Promise<{ status: number; data?: { previews: ProjectPreview[] } }> {
    return fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/similar-domains?skip=${skip}&take=${take}`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok)
          return response
            .json()
            .then((data: { previews: ProjectPreview[] }) => ({
              status: response.status,
              data,
            }));
        return { status: response.status };
      })
      .catch(() => ({ status: 500 }));
  },

  async getProjectPreviewsThatTheUserOwns(
    token: string,
    skip = 0,
    take = 5
  ): Promise<{ status: number; data?: { previews: ProjectPreview[] } }> {
    return fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/owned?skip=${skip}&take=${take}`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok)
          return response
            .json()
            .then((data: { previews: ProjectPreview[] }) => ({
              status: response.status,
              data,
            }));
        return { status: response.status };
      })
      .catch(() => ({ status: 500 }));
  },

  async getProjectPreviewsOfWhichTheUserIsAMember(
    token: string,
    skip = 0,
    take = 5
  ): Promise<{ status: number; data?: { previews: ProjectPreview[] } }> {
    return fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/member?skip=${skip}&take=${take}`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok)
          return response
            .json()
            .then((data: { previews: ProjectPreview[] }) => ({
              status: response.status,
              data,
            }));
        return { status: response.status };
      })
      .catch(() => ({ status: 500 }));
  },

  async getProjectBySlug(
    token: string,
    slug: string
  ): Promise<{ status: number; data?: RetrievedCompleteProject }> {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${slug}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok)
          return response.json().then((data: RetrievedCompleteProject) => ({
            status: response.status,
            data,
          }));
        return { status: response.status };
      })
      .catch(() => ({ status: 500 }));
  },

  async getProjectMetadata(slug: string): Promise<{
    status: number;
    data?: {
      metadata: ProjectMetadata;
    };
  }> {
    return fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/${slug}/metadata`,
      { method: 'GET' }
    )
      .then((response) => {
        if (response.ok)
          return response
            .json()
            .then((data: { metadata: ProjectMetadata }) => ({
              status: response.status,
              data,
            }));
        return { status: response.status };
      })
      .catch(() => ({ status: 500 }));
  },
};
