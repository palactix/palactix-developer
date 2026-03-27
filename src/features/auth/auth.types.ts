export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  developer?: {
    has_apps: boolean;
    apps_count: number;
  };
}

export interface MeResponse {
  data: AuthUser;
}
