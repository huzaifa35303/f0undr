export type ReadingStatus = 'reading' | 'completed' | 'wishlist';

export type BookCategory = 
  | 'Startups & Business'
  | 'AI & Technology'
  | 'Philosophy & Mindset'
  | 'Design & UX'
  | 'Biographies'
  | 'Productivity & Systems';

export interface Book {
  id: string;
  title: string;
  author: string;
  year?: string;
  coverGradient?: string;
  status: ReadingStatus;
  rating: number; // 1 to 5
  category: BookCategory;
  keyTakeaways: string[];
  notes: string;
  favoriteQuote?: string;
  dateAdded: string;
  externalUrl?: string;
  featured?: boolean;
  units?: string[];
}


export type ToolCategory = 
  | 'AI & LLMs'
  | 'Development'
  | 'Design & UI'
  | 'Productivity'
  | 'Analytics & Growth';

export interface CuratedTool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  url: string;
  pricing?: 'Free' | 'Freemium' | 'Paid' | 'Open Source';
  featured?: boolean;
  tags: string[];
}

export type ThingCategory = 
  | 'Hardware & Desk'
  | 'Workspace & Audio'
  | 'Everyday Carry'
  | 'Software Stack'
  | 'Mindset & Artifact';

export interface Thing {
  id: string;
  title: string;
  category: ThingCategory;
  specs?: string;
  whyWeLoveIt: string;
  url?: string;
  iconName?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  handle: string;
  avatarUrl: string;
  bio: string;
  status: 'Building' | 'Deep Work' | 'Available' | 'Offline';
  skills: string[];
  quote: string;
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    email?: string;
    website?: string;
  };
  highlightProject?: string;
  verifiedFounder?: boolean;
  department?: string;
}


export interface Venture {
  id: string;
  title: string;
  tagline: string;
  stage: 'Active' | 'Shipped' | 'Beta' | 'Incubating';
  description: string;
  metrics?: string;
  tags: string[];
  link?: string;
}

export type UserRole = 'founder' | 'admin' | 'editor';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  avatarUrl: string;
  bio?: string;
  permissions: {
    canEditContent: boolean;
    canManageTeam: boolean;
    canConfigureSeo: boolean;
    canExportVault: boolean;
    canResetSystem: boolean;
  };
}

export interface SeoSettings {
  siteTitle: string;
  siteDescription: string;
  primaryKeywords: string;
  canonicalUrl: string;
  ogImage: string;
  googleVerificationId: string;
  googleAnalyticsId: string;
  authorName: string;
  twitterHandle: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  action: string;
  target: string;
  performedBy: string;
  role: string;
}

