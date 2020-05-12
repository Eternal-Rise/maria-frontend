import { IMediaTypes } from './interfaces';

export const DELAY: number = 200;

export const GENRES: string[] = [
  'Action',
  'Adventure',
  'Biography',
  'Comedy',
  'Crime',
  'Detective',
  'Documental',
  'Drama',
  'Fantastic',
  'Fantasy',
  'Historical',
  'Horror',
  'Melodrama',
  'Military',
  'Mystic',
  'Political',
  'Romantic',
  'Science fiction',
  'Stand Up',
  'Supernatural',
  'Tale',
  'Thriller',
  'Western',
];

export const MEDIA_TYPES: IMediaTypes[] = ['anime', 'film', 'other'];
export const MEDIA_SERIAL_TYPES: IMediaTypes[] = ['anime-serial', 'serial'];
export const MEDIA_ALL_TYPES: IMediaTypes[] = ['anime', 'anime-serial', 'film', 'serial', 'other'];