import { Profile } from './profile.model';

export interface Blog {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  toFrontPage: boolean;
  approved: boolean;
  showOnlyPreview: boolean;
  author: Profile;
}
