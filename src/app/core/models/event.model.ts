import { Profile } from './profile.model';

export interface Event {
  slug: string;
  title: string;
  description: string;
  location: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  attending: boolean;
  favoritesCount: number;
  author: Profile;
  usePushEach: true;
}
