import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from 'rxjs';
import {MoviesService} from '../movies-service';
import {Movie} from '../interfaces/movie';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [
    AsyncPipe,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit{
  service = inject(MoviesService);
  movies$!: Observable<Movie[]> | undefined;

  query$ = new Subject<string>();

  ngOnInit(): void {
    this.searchMovies();
  }

  onSearch(query: string) {
    this.query$.next(query);
  }
///komentar:dodaj komponenta za movieto vo html
  private searchMovies() {
    this.movies$ = this.query$.pipe(
      debounceTime(400), //delay
      distinctUntilChanged(), //cant spam search same hero
      switchMap(query =>  // search only latest query
        this.service.searchMovies(query))
    );
  }
}
