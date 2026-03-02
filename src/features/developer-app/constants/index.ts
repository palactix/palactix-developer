export const APP_CHECKLIST_STEPS = [
  { id: 'created', label: 'App Created' },
  { id: 'platform_added', label: 'Platform Added' },
  { id: 'platform_verified', label: 'Platform Verified' },
  { id: 'active', label: 'App Active' },
] as const;

export const PLATFORMS = [
  { id: 'facebook', name: 'Facebook', icon: 'Facebook' },
  { id: 'twitter', name: 'X (Twitter)', icon: 'Twitter' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'Linkedin' },
  { id: 'instagram', name: 'Instagram', icon: 'Instagram' },
] as const;
