import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Movie, Season} from './interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class  MoviesService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://www.omdbapi.com/';
  private apiKey='d5fda2c7'

  searchMovies(query: string): Observable<Movie[]> {
    const url = `${this.apiUrl}?apikey=${this.apiKey}&s=${query}`;
    return this.http.get<{ Search: Movie[], Response: string }>(url).pipe(
      map(res => res.Search || []) // fallback to empty array if no result
    );
  }
  getMovieDetails(imdbID: string): Observable<Movie> {
    const url = `${this.apiUrl}?apikey=${this.apiKey}&i=${imdbID}&plot=full`;
    return this.http.get<Movie>(url);
  }
  getSeason(imdbID: string, seasonNumber: number): Observable<Season> {
    const url = `${this.apiUrl}?apikey=${this.apiKey}&i=${imdbID}&Season=${seasonNumber}`;
    return this.http.get<Season>(url);
  }
}
