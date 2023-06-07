import { DomainModel, Role, Skill } from './appModels';

export interface Project {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string | null;
  coverImage: string | null;
  public: boolean;
  createdAt: Date;
  updatedAt: Date;
  skills: {
    id: number;
    name: Skill[];
    domain: DomainModel;
  }[];
  members: ProjectMember[];
}

export interface ProjectMember {
  role: Role;
  user: {
    id: number;
    slug: string;
    firstName: string;
    lastName: string;
    profilePicture: string | null;
  };
}

export interface RetrievedCompleteProject {
  project: Project;
  currentUserRole: Role | null;
}

export interface ProjectPreview {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  coverImage: string | null;
  createdAt: Date;
  members: ProjectMemberPreview[];
}

export interface ProjectMemberPreview {
  role: Role;
  user: {
    id: number;
    slug: string;
    firstName: string;
    lastName: string;
    profilePicture: string | null;
  };
}

export interface ProjectMetadata {
  name: string;
  shortDescription: string;
}

export interface CreateProjectDto {
  name: string;
  shortDescription: string;
  description?: string;
  coverImage?: Buffer;
  public?: boolean;
  skills: Skill[];
}
