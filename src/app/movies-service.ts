import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Movie} from './interfaces/movie';
import {Season} from './interfaces/season';
import {Actor} from './interfaces/actor';
import {ActorResults} from './interfaces/actorResults';


@Injectable({
  providedIn: 'root'
})
export class  MoviesService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://www.omdbapi.com/';
  private apiKey='d5fda2c7'
  private apiPictures='https://api.themoviedb.org/3'
  private apiPicturesKey='76eabc301dda3e253fce074b6d1ddbdd'

  searchMovies(query: string): Observable<Movie[]> {
    const url = `${this.apiUrl}?apikey=${this.apiKey}&s=${query}`;
    return this.http.get<{ Search: Movie[], Response: string ,totalResults:string}>(url).pipe(
      map(res =>
      {
        const movies=res.Search||[];
        return this.unique(movies);
      })

    )
  }

  unique(movies: Movie[]): Movie[] {
    const duplicatesRemove = new Set();
    return movies.filter(movie => {
      if (duplicatesRemove.has(movie.imdbID)) {
        return false;
      }
      duplicatesRemove.add(movie.imdbID);
      return true;
    });
  }
  getMovieDetails(imdbID: string): Observable<Movie> {
    const url = `${this.apiUrl}?apikey=${this.apiKey}&i=${imdbID}&plot=full`;
    return this.http.get<Movie>(url);
  }
  getSeason(imdbID: string, seasonNumber: number): Observable<Season> {
    const url = `${this.apiUrl}?apikey=${this.apiKey}&i=${imdbID}&Season=${seasonNumber}`;
    return this.http.get<Season>(url);
  }
  getActor(name:string):Observable<Actor|null>{
    const url = `${this.apiPictures}/search/person?api_key=${this.apiPicturesKey}&query=${encodeURIComponent(name)}`;
    return this.http.get<ActorResults>(url).pipe(
      map(res => res.results.length > 0 ? res.results[0] : null)
    );
  }
}
