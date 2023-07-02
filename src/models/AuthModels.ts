import { Skill } from './appModels';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profilePicture?: Buffer;
  skills: Skill[];
}

export interface ValidateEmailDto {
  email: string;
  token: string;
}

export interface ResetPasswordDto {
  email: string;
  token: string;
  newPassword: string;
}
