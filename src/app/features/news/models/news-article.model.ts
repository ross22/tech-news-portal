export interface NewsArticle {
  id: number;
  category: string;
  title: string;
  summary: string;
  author: string;
  publishedAt: string;
  readTime: string;
  accent: string;
  tag: string;
}

export const CATEGORIES = ['All stories', 'AI & ML', 'Startups', 'Gadgets', 'Science'] as const;
