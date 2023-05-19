import { ActionModel, DomainModel, Skill } from './appModels';

export type User = {
  id: number;
  slug: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  registeredAt: Date;
};

export type UserProfile = User & {
  skills: {
    id: number;
    name: Skill;
    domain: DomainModel;
  }[];
  actions: ActionModel[];
  isEmailValidated: boolean | null;
};

export type RetrievedUserProfile = {
  user: UserProfile;
  isItTheUserHimself: boolean;
};

export type UserMetadata = {
  firstName: string;
  lastName: string;
};
