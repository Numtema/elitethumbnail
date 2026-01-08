
export type ViewState = 'landing' | 'auth' | 'dashboard';
export type DashboardTab = 'overview' | 'generator' | 'strategy' | 'media-lab' | 'analytics';

export interface ThumbnailAsset {
  id: string;
  url: string;
  prompt: string;
  type: 'image' | 'video';
  createdAt: string;
}

export interface KPIStats {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  color: string;
}

export interface AuthUser {
  name: string;
  email: string;
  avatar: string;
}
