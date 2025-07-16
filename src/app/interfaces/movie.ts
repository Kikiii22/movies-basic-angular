import {Season} from './season';
import {Rating} from './rating';

export interface Movie {
  Title?: string;
  Year: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: Rating[];
  Metascore?: string | null;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID: string;
  Type?: string;
  totalSeasons?: number;
  Response?: 'True' | 'False';
  Seasons?: Season[];
  totalResults?:string;
}




