import { fetchWithApiKey } from './fetchWithApiKey';

import {
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  ValidateEmailDto,
} from '@/models/authModels';

export const authServices = {
  async isAuthenticated(token: string): Promise<boolean> {
    return fetchWithApiKey(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/is-authenticated`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.ok)
      .catch(() => false);
  },

  async login(
    loginDto: LoginDto
  ): Promise<{ status: number; data?: { token: string } }> {
    return fetchWithApiKey(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginDto),
    })
      .then((response) => {
        if (response.ok)
          return response.json().then((data: { token: string }) => ({
            status: response.status,
            data,
          }));
        return { status: response.status };
      })
      .catch(() => ({ status: 500 }));
  },

  async register(registerDto: RegisterDto): Promise<{ status: number }> {
    return fetchWithApiKey(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerDto),
    })
      .then((response) => ({ status: response.status }))
      .catch(() => ({ status: 500 }));
  },

  async validateEmail(
    validateEmailDto: ValidateEmailDto
  ): Promise<{ status: number }> {
    return fetchWithApiKey(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/validate-email`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validateEmailDto),
      }
    )
      .then((response) => ({ status: response.status }))
      .catch(() => ({ status: 500 }));
  },

  async sendResetPasswordEmail(email: string): Promise<{ status: number }> {
    return fetchWithApiKey(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/send-reset-password-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    )
      .then((response) => ({ status: response.status }))
      .catch(() => ({ status: 500 }));
  },

  async resetPassword(
    resetPasswordDto: ResetPasswordDto
  ): Promise<{ status: number }> {
    return fetchWithApiKey(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resetPasswordDto),
      }
    )
      .then((response) => ({ status: response.status }))
      .catch(() => ({ status: 500 }));
  },
};
