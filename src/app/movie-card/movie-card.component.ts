/**
 * @module MovieCardComponent
 * Renders a responsive grid of movie cards for each movie in the database. 
 * Each movie card has an image, links to open dialogs for
 * The toggle button to add or remove a movie from the users favorite movie list.
 * Also renders the NavBar Component.
 */
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
    this.getFavoriteMovies();
  }

  /**
   * @function getMovies
   * When the user loads the `/movies` page, loads in the movies and renders movie card elements.
   * Then, an array of the users favorite movies by ID is fetched from the server and
   * each movie that is in that list is marked as favorite.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * @function addFavoriteToList
   * @param movieID string containing the ID of a movie.
   * Adds a movieID to a user's favorite list.
   * Uses POST request [[FetchApiDataService.addFavoriteMovie]].
   */
  addFavoriteToList(movieID: string): void {
    this.fetchApiData.addFavoriteMovie(movieID).subscribe(
      (response: any) => {
        this.snackBar.open('Movie has been successfully added', '', {
          duration: 5000,
        });
      },
      // Error handler
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

  /**
   * @function removeFavoriteMovies
   * @param movieID string containing the ID of a movie.
   * Removes a movie from a user's favorite list.
   * Uses DELETE request [[FetchApiDataService.removeFavoriteMovies]].
   */
  removeFavoriteMovies(movieID: any): void {
    this.fetchApiData.deleteFavoriteMovie(movieID).subscribe(
      (response: any) => {
        this.snackBar.open('Movie has been removed', '', {
          duration: 5000,
        });
      },
      // Error handler
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

  /**
   * @function getFavoriteMovies
   * Fetches the favorite movies from the server for a logged in user.
   * This function is called from within [[MovieCardComponent.getMovies]].
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favourites = resp.FavoriteMovies;
    });
  }

  /**
   * @function isFavorite
   * @param movieId
   * Sets the isFavorite attribute of each movie to true or false.
   * This is called after fetching [[MovieCardComponent.getFavoriteMovies]]
   * This function is called from within [[MovieCardComponent.getMovies]].
   */
  isFavorite(movieId: string): boolean {
    return this.favourites.some((movie: any) => movie == movieId);
  }

  /**
   * @function openDescriptionDialog
   * @param movie {Title: <string>, Description: <string>, ... }
   * Opens a dialog box with a MovieDetailsComponent, passing the movie data into the component.
   */
  openDescriptionDialog(movie: any): void {
    this.dialog.open(MovieDetailsComponent, {
      width: '280px',
      data: { movie },
    });
  }

  /**
   * @function openGenreDialog
   * @param Genre {Name: <string>, Description: <string>}
   * Opens a dialog box with a GenreViewComponent, passing the Genre data into the component.
   */
  openGenreDialog(Genre: any): void {
    this.dialog.open(GenreViewComponent, {
      width: '280px',
      data: { Genre },
    });
  }

  /**
   * @function openDirectorDialog
   * @param Director {Name: <string>, Bio: <string>, BirthYear: <string>}
   * Opens a dialog box with a DirectorViewComponent, passing the Director data into the component.
   */
  openDirectorDialog(Director: any): void {
    this.dialog.open(DirectorViewComponent, {
      width: '280px',
      data: { Director },
    });
  }

  /**
   * @function toggleFavorite
   * @param movieID
   * Checks if a favorite movie icon is activated or not by movieID;
   * User clicks on 'empty' icon of the favorite movies,
   * and the POST request [[FetchApiDataService.addFavoriteMovie]] is activated.
   * The movie is added to the favorite list.
   * User clicks on 'full' icon of the favorite movies,
   * and the DELETE request [[FetchApiDataService.removeFavoriteMovie]] is activated.
   * The movie is removed from the favorite list.
   */
  toggleFavorite(movieID: string): void {
    this.isFavorite(movieID)
      ? this.removeFavoriteMovies(movieID)
      : this.addFavoriteToList(movieID);
    this.ngOnInit();
  }
}
