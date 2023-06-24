import { Domain, Skill } from '@/models/appModels';
import {
  CreateProjectDto,
  Project,
  ProjectMetadata,
  ProjectPreview,
  RetrievedCompleteProject,
} from '@/models/projectModels';

type SearchedProjectsQueries = {
  token: string;
  query?: string;
  domains?: Domain[];
  skills?: Skill[];
};

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

  async getSearchedProjectsCount({
    token,
    query = '',
    domains = [],
    skills = [],
  }: SearchedProjectsQueries): Promise<{
    status: number;
    data?: {
      count: number;
    };
  }> {
    const domainsToString = domains.join(',');
    const skillsToString = skills.join(',');

    return fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/search-count?query=${query}&domains=${domainsToString}&skills=${skillsToString}`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok)
          return response.json().then((data: { count: number }) => ({
            status: response.status,
            data,
          }));
        return { status: response.status };
      })
      .catch(() => ({ status: 500 }));
  },

  async getSearchedProjects({
    token,
    query = '',
    domains = [],
    skills = [],
  }: SearchedProjectsQueries): Promise<{
    status: number;
    data?: {
      projects: ProjectPreview[];
    };
  }> {
    const domainsToString = domains.join(',');
    const skillsToString = skills.join(',');

    return fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/search?query=${query}&domains=${domainsToString}&skills=${skillsToString}`,
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
            .then((data: { projects: ProjectPreview[] }) => ({
              status: response.status,
              data,
            }));
        return { status: response.status };
      })
      .catch(() => ({ status: 500 }));
  },

  async createProject(
    token: string,
    createProjectDto: CreateProjectDto
  ): Promise<{
    status: number;
    data?: {
      project: Project;
    };
  }> {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createProjectDto),
    })
      .then((response) => {
        if (response.ok)
          return response.json().then((data: { project: Project }) => ({
            status: response.status,
            data,
          }));
        return { status: response.status };
      })
      .catch(() => ({ status: 500 }));
  },

  async askToJoinProject(
    token: string,
    projectId: number
  ): Promise<{ status: number }> {
    return fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/ask-to-join`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => ({ status: response.status }))
      .catch(() => ({ status: 500 }));
  },
};
