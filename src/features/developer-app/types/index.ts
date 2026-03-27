export type AppStatus = 'draft' | 'active';

export interface DeveloperApp {
  id: string;
  name: string;
  logoUrl?: string;
  status: AppStatus;
  createdAt: string;
  clientCredentials?: {
    clientId: string;
    clientSecret: string;
  };
}

export interface PlatformIntegration {
  id: string;
  platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram';
  appId: string;
  status: 'pending' | 'verified' | 'failed';
  createdAt: string;
  platformAppId: string;
}
