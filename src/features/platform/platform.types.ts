export interface PlatformIconMap {
  [key: string]: string;
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
  icon: PlatformIconMap;
}

export interface PlatformsResponse {
  data: Platform[];
}