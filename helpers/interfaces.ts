
export interface IMedia {
  description?: string;
  director?: string;
  duration: number;
  genre: string[];
  link?: string;
  linkLang?: string;
  poster?: string;
  releaseDate?: string | null;
  title: string;
  watched: boolean;
}

export interface IMediaSerial extends IMedia {
  season: number;
  seasonsAmount?: number;
  seriesInSeason: number;
  toWatch: number;
}

export type IMediaTypes = 'anime' | 'anime-serial' | 'film' | 'serial';
export type IMediaType = IMedia | IMediaSerial;
