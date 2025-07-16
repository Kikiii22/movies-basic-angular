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
  movie: Movie | undefined;
  seasons: Season[] = [];
  cast: string[] = [];
  selectedSeason: string | null = null;
  actors: { [name: string]: { id: number | undefined; name: string | undefined; image: string } } = {};
  defaultImage = '/No_Image_Available.jpg';

  constructor(private route: ActivatedRoute, private service: MoviesService) {
  }

  loadImages() {
    for (const actor of this.cast) {
      this.service.getActor(actor).subscribe(res => {
        this.actors[actor] = {
          id: res?.id,
          name: res?.name,
          image: res?.profile_path
            ? `https://image.tmdb.org/t/p/w200${res.profile_path}`
            : this.defaultImage
        }
      });
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
          for (let i = 1; i <= total; i++) {
            calls.push(this.service.getSeason(id, i));
          }
          forkJoin(calls).subscribe((seasons: Season[]) => {
            this.seasons = seasons;
          });
        }
      });
    }

  }
  Season(Season: string) {
    if (this.selectedSeason === Season) {
      this.selectedSeason = null;
    } else {
      this.selectedSeason = Season;
    }
  }
}

