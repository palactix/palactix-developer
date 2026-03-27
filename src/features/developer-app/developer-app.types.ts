import { Platform } from "../platform/platform.types";

export interface DeveloperApp {
  id: string;
  name: string;
  logo_url: string | null;
  status: AppStatus;
  client_id: string | null;
  created_at: string;
  updated_at: string;
  integrations: PlatformIntegration[];
}

export enum AppStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
}


export interface PlatformIntegration {
  id: string;
  platform_id: number;
  app_id: string;
  credentials?: PlatformCredentialFields;
  client_id?: string;
  client_secret?: string;
  client_meta?: PlatformClientMeta;
  status: AppCredStatus;
  created_at: string;
  platform: Platform;
}

export enum AppCredStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  FAILED = 'failed',
}

export interface PlatformClientMeta {
  redirect_url?: string;
  [key: string]: string | undefined;
}

export interface PlatformCredentialFields {
  client_id: string;
  client_secret: string;
  client_meta?: PlatformClientMeta;
}

export interface DeveloperAppResponse {
  data: DeveloperApp;
}

export type DeveloperAppInfoResponse = DeveloperApp;

export interface DeveloperAppsResponse {
  data: DeveloperApp[];
}

export interface CreateAppPayload {
  name: string;
  logo?: File;
  type: string;
}

export interface UpdateAppPayload {
  name?: string;
  logo?: File;
}

export interface AddCredentialsPayload {
  platform_id: string;
  client_id: string;
  client_secret: string;
  client_meta?: PlatformClientMeta;
}

export interface GenerateCredentialsResponse {
  client_id: string;
  client_secret: string;
}

export type VerifyIntegrationResponse = {
  redirect_url: string;
  connection_id: string;
};

export type AddCredentialResponse = PlatformIntegration;