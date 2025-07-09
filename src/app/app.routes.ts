import { Routes } from '@angular/router';
import {Search} from './search/search';
import {SearchMovie} from './search-movie/search-movie';
import {MovieDetails} from './movie-details/movie-details';

export const routes: Routes = [
  {
    path:'',
    component:Search
  },
  {
    path:'search',
    component:Search
  },
  {
    path:'movie/:id',
    component:MovieDetails
  }
];
