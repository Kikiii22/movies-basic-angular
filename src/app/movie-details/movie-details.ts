import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MoviesService} from '../movies-service';
import {Movie,} from '../interfaces/movie';
import {forkJoin} from 'rxjs';
import {Season} from '../interfaces/season';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-movie-details',
  imports: [
    TitleCasePipe
  ],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails implements OnInit {
  movie: Movie | undefined ;

  constructor(private route: ActivatedRoute, private service: MoviesService) {
  }

  seasons: Season[] = [];
  cast: string[] = [];
  images: { [name: string]: string } = {};
  defaultImage = 'https://via.placeholder.com/100x150?text=No+Image';

  loadImages() {
    for (const actor of this.cast) {
      this.service.getActor(actor).subscribe(res => {
        this.images[actor] = res?.profile_path
          ? `https://image.tmdb.org/t/p/w200${res.profile_path}`
          : this.defaultImage;
      })
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {

      this.service.getMovieDetails(id).subscribe(movie => {
        this.movie = movie;
        this.cast = movie.Actors
          ? movie.Actors.split(',').map(name => name.trim())
          : [];
        this.loadImages()
        if (movie.Type === 'series' && movie.totalSeasons) {
          const total = +movie.totalSeasons;
          const calls = [];
          for (let i = 0; i < total; i++) {
            calls.push(this.service.getSeason(id, i));
          }
          forkJoin(calls).subscribe((seasons: Season[]) => {
            this.seasons = seasons;
          });
        }
      });
    }

  }
}

