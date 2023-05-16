export interface User {
  id: number;
  slug: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  registeredAt: Date | null;
}

export interface RetrievedUserProfile {
  user: User;
  isItTheUserHimself: boolean;
}

export interface UserMetadata {
  firstName: string;
  lastName: string;
}
