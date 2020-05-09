
export interface IMedia {
  _id?: string;
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

export interface IMediaDelete {
  media: IMediaAny;
  mediaType: IMediaTypes;
}
export type IMediaAny = IMedia | IMediaSerial;


export interface iMediaBulk {
  list: IMediaAny[];
  mediaType: IMediaTypes;
  title: string;
}


export type IMediaTypes = 'anime' | 'anime-serial' | 'film' | 'serial';

export interface IUser {
  _id: string;
  username: string;
}

export interface IProfile {
  email: string;
  username: string;
}