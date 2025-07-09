import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MoviesService} from '../movies-service';
import {Movie, Season} from '../interfaces/movie';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-movie-details',
  imports: [],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails implements OnInit  {
  movie: Movie | undefined;
  constructor(private route: ActivatedRoute, private service: MoviesService) {}
  seasons: Season[] = [];
  cast: string[] = [];
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id)
    {
      this.service.getMovieDetails(id).subscribe(movie => {
        this.movie = movie;
        this.cast = movie.Actors
          ? movie.Actors.split(',').map(name => name.trim())
          : [];

        if (movie.Type === 'series' && movie.totalSeasons) {
          const total = +movie.totalSeasons;
          const calls = [];
          for (let i = 1; i <= total; i++) {
            calls.push(this.service.getSeason(id, i));
          }

          forkJoin(calls).subscribe((seasons: Season[]) => {
            console.log('Loaded seasons:', seasons);
            this.seasons = seasons;
          });
        }
      });
    }

  }

}
