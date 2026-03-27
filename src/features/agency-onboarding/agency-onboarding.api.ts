export interface UsernameCheckResponse {
  available: boolean;
  username: string;
  message?: string;
}

export const checkUsernameAvailability = async (username: string): Promise<UsernameCheckResponse> => {
  const response = await fetch("/api/mock/username", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    return { available: false, username, message: data?.message ?? "Check failed" };
  }

  return response.json();
};
