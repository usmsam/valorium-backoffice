export interface NavigationItem {
  id: string;
  label: string;
  icon?: string;
  path: string;
}

export interface NavigationSection {
  id: string;
  title: string;
  items: NavigationItem[];
}

export interface MiddlePanelItem {
  id: string;
  title: string;
  subtitle?: string;
  path: string;
  metadata?: Record<string, any>;
}
