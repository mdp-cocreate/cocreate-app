import { LoginDto } from '@/models/authModels';

export const authServices = {
  async isAuthenticated(token: string): Promise<boolean> {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/is-authenticated`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.ok)
      .catch(() => false);
  },

  async login(
    loginDto: LoginDto
  ): Promise<{ status: number; data?: { token: string } }> {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
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
};
