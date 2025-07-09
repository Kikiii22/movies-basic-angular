import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../interfaces/movie';
import {RouterLink} from '@angular/router';
import {MoviesService} from '../movies-service';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-search-movie',
  imports: [
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './search-movie.html',
  styleUrl: './search-movie.css',
  standalone:true
})
export class SearchMovie implements OnInit {
  @Input() movie!: Movie;
  fullMovie!: Movie;
  constructor(private service: MoviesService) {}

  ngOnInit(): void {
    if (this.movie?.imdbID) {
      this.service.getMovieDetails(this.movie.imdbID).subscribe(data=>this.fullMovie=data);
    }    }

}
