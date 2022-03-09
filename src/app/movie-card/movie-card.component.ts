import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// import App components
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }
  favourites: any = [];

  ngOnInit(): void {
    this.getMovies();
    this.getFavouriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  addFavoriteToList(movieID: string): void {
    this.fetchApiData.addFavoriteMovie(movieID).subscribe(
      (response: any) => {
        console.log('addFavoriteMovie');
        this.snackBar.open('Movie has been successfully added', '', {
          duration: 5000,
        });
      },
      // error handler
      (response: any) => {
        this.snackBar.open(
          'Something is wrong. Please, try again',
          'OK',
          {
            duration: 5000,
          }
        );
      }
    );
    this.ngOnInit();
  }

  removeFavoriteMovies(movieID: any): void {
    this.fetchApiData.deleteFavoriteMovie(movieID).subscribe(
      (response: any) => {
        this.snackBar.open('Movie has been removed', '', {
          duration: 5000,
        });
      },
      // in case of error, the error will be catched below
      (response: any) => {
        this.snackBar.open(
          'Something is wrong. Please try again',
          'OK',
          {
            duration: 5000,
          }
        );
      }
    );
    this.ngOnInit();
  }

  getFavouriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favourites = resp.FavoriteMovies;
    });
  }

  isFavorite(movieId: string): boolean {
    return this.favourites.some((movie: any) => movie == movieId);
  }

  openDescriptionDialog(movie: any): void {
    this.dialog.open(MovieDetailsComponent, {
      width: '280px',
      data: { movie },
    });
  }

  openGenreDialog(Genre: any): void {
    this.dialog.open(GenreViewComponent, {
      width: '280px',
      data: { Genre },
    });
  }

  openDirectorDialog(Director: any): void {
    this.dialog.open(DirectorViewComponent, {
      width: '280px',
      data: { Director },
    });
  }

  toggleFavorite(movieID: string): void {
    this.isFavorite(movieID)
      ? this.removeFavoriteMovies(movieID)
      : this.addFavoriteToList(movieID);
    this.ngOnInit();
  }
}
