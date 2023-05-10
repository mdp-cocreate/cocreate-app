export const authServices = {
  async isAuthenticated(token: string): Promise<boolean> {
    return fetch(`http://localhost:3001/auth/is-authenticated`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.ok)
      .catch(() => false);
  },
};
