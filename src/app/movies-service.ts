import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Movie} from './interfaces/movie';
import {Season} from './interfaces/season';

@Injectable({
  providedIn: 'root'
})
export class  MoviesService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://www.omdbapi.com/';
  private apiKey='d5fda2c7'

  searchMovies(query: string): Observable<Movie[]> {
    const url = `${this.apiUrl}?apikey=${this.apiKey}&s=${query}&plot=full`;
    console.log('API CALL: searchMovies', url);
    return this.http.get<{ Search: Movie[], Response: string }>(url).pipe(
      map(res =>
      {
        const movies=res.Search||[];
        console.log(movies);
        return this.unique(movies);
      })

    )
  }
  unique(movies: Movie[]): Movie[] {
    const seen = new Set();
    return movies.filter(movie => {
      if (seen.has(movie.imdbID)) {
        return false;
      }
      seen.add(movie.imdbID);
      return true;
    });
  }
  getMovieDetails(imdbID: string): Observable<Movie> {

    const url = `${this.apiUrl}?apikey=${this.apiKey}&i=${imdbID}&plot=full`;
    console.log('API CALL: searchMovies', url);
    return this.http.get<Movie>(url);
  }
  getSeason(imdbID: string, seasonNumber: number): Observable<Season> {
    const url = `${this.apiUrl}?apikey=${this.apiKey}&i=${imdbID}&Season=${seasonNumber}`;
    console.log('API CALL: searchMovies', url);
    return this.http.get<Season>(url);
  }
}
