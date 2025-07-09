import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from 'rxjs';
import {MoviesService} from '../movies-service';
import {Movie} from '../interfaces/movie';
import {SearchMovie} from '../search-movie/search-movie';

@Component({
  selector: 'app-search',
  imports: [
    AsyncPipe,
    SearchMovie
  ],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit {
  service = inject(MoviesService);
  movies$!: Observable<Movie[]> | undefined;
  query$ = new Subject<string>();

  ngOnInit(): void {
    this.searchMovies();
  }

  onSearch(query: string) {
    this.query$.next(query);
  }

  private searchMovies() {
    this.movies$ = this.query$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(query =>
        this.service.searchMovies(query))
    );
  }
}
