export interface AuthUserWorkspace {
  id: string;
  name: string;
  username: string | null;
  logo: string | null;
  app_id: string | null;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  signup_type: "developer" | "agency" | null;
  avatar_url: string | null;
  developer?: {
    has_apps: boolean;
    apps_count: number;
  };
  workspaces?: AuthUserWorkspace[];
}

export interface MeResponse {
  data: AuthUser;
}
