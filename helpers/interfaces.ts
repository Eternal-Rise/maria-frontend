export interface IAnime {
  __v?: number;
  _id?: string;
  createdAt?: Date;
  description: string;
  director: string;
  duration: number;
  genre: string[];
  link: string;
  linkLang: string;
  poster: string;
  releaseDate: string | null;
  title: string;
  updatedAt?: Date;
  watched: boolean;
}

export type IMedia = 'anime' | 'anime-serial' | 'film' | 'serial';
