export function getHeaders(token: string | null): Record<string, string> {
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export function handleAuthError(
  status: number,
  logout: () => void
): void {
  if (status === 401 || status === 403) {
    logout();
  }
}

export function parseApiResponse<T>(res: Response, fallback: T): Promise<T> {
  return res.json().then((data) => {
    if (Array.isArray(data)) return data as T;
    return (data.data || data.value || fallback) as T;
  });
}
