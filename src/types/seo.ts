export interface PageSeoConfig {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  robots?: string;
  noindex?: boolean;
}

export interface SiteSeoData {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string;
  canonicalBase: string;
  defaultOgImage: string;
  author: string;
  publisher: string;
  themeColor: string;
  locale: string;
  facebookAppId?: string;
  twitterHandle?: string;
  googleSearchConsoleCode?: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  bingVerificationCode?: string;
  indexNowApiKey?: string;
  pages?: Record<string, PageSeoConfig>;
  redirects?: Array<{ from: string; to: string; code: number }>;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
