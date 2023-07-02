export async function fetchWithApiKey(
  url: string,
  options: RequestInit
): Promise<Response> {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';

  const headers = {
    ...options.headers,
    'x-api-key': apiKey,
  };

  const requestOptions = {
    ...options,
    headers,
  };

  return fetch(url, requestOptions);
}
