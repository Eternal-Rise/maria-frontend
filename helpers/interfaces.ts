
export interface IMedia {
  _id?: string;
  duration?: number;
  genres: string[];
  link?: string;
  title: string;
  watched: boolean;
  year?: number | string;

  [key: string]: any;
}

export interface IMediaSerial extends IMedia {
  seasons: number[],
  totalSeries: number;
  toWatch: string;
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


export type IMediaTypes = 'anime' | 'anime-serial' | 'film' | 'serial' | 'other';

export interface IUser {
  _id: string;
  username: string;
}

export interface IProfile {
  email: string;
  username: string;
}

export interface IStatistic {
  days: number;
  hours: number;
  minutes: number;
}

export interface IStatisticComplex {
  total: IStatistic;
  totalToView: IStatistic;
  totalViewed: IStatistic;
}