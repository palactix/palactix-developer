export interface DeveloperApp {
  id: string;
  name: string;
  logo_url: string | null;
  status: string;
  client_id: string;
  created_at: string;
  updated_at: string;
}

export interface DeveloperAppResponse {
  data: DeveloperApp;
}

export interface DeveloperAppsResponse {
  data: DeveloperApp[];
}

export interface CreateAppPayload {
  name: string;
  logo?: File;
}