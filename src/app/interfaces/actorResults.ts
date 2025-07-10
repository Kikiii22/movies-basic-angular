import {Actor} from './actor';

export interface ActorResults {
  page: number;
  results: Actor[];
  total_pages: number;
  total_results: number;
}
