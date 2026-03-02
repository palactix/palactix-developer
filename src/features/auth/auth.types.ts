export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
}

export interface MeResponse {
  data: AuthUser;
}
