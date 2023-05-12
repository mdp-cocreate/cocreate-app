import { Role } from './appModels';

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

export interface ProjectPreview {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  coverImage: string | null;
  createdAt: Date;
  members: ProjectMemberPreview[];
}
