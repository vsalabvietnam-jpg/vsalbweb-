export interface Product {
  id: string;
  name: string;
  englishName?: string;
  category?: string;
  botanicalName: string;
  origin: string;
  price: number;
  originalPrice?: number;
  volume: string;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  scentNotes: string;
  benefits: string[];
  ingredients?: string;
  usage?: string;
  storage?: string;
  caution?: string;
  batchNo?: string;
  mfgDate?: string;
  expDate?: string;
  producer?: string;
  facility?: string;
  distributor?: string;
  hotline?: string;
  badge?: string;
  tagline?: string;
}

export interface Region {
  id: string;
  name: string;
  province: string;
  tagline: string;
  herbs: string[];
  description: string;
  fullStory: string;
  altitude: string;
  climate: string;
  image: string;
}

export interface ProcessStep {
  step: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  image: string;
  iconName: string;
}

export interface ArticleSection {
  title?: string;
  level?: number;
  content: string[];
  image?: string;
  bullets?: string[];
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string[];
  gallery?: string[];
  markdown?: string;
  sections?: ArticleSection[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
