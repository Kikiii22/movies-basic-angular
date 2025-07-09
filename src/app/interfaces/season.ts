import {Episode} from './episode';

export interface Season {
  Title: string;
  Season: string;
  totalSeasons: string;
  Episodes: Episode[];
}
