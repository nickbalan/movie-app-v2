// imports Angular Material UI.
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// imports App's components.
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

/**
 * @module MovieCardComponent
 * @description renders a grid of movie cards for each movie in the database.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})

/**
 * Each movie card has an image, links to open dialogs.
 * The toggle button adds or removes a movie from the users favorite movie list.
 * Renders the NavBar Component.
 */
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}
  favourites: any = [];

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * @function getMovies
   * When the `/movies` page is loaded, renders movie card elements, an array of the users favorite movies by ID is fetched from the database and each movie from that list is marked as favorite.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * @function addFavoriteToList
   * @param {string} movieID - containing the movie ID.
   * Adds a movie to a user's favorite list.
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
        this.snackBar.open('Something is wrong. Please, try again', 'OK', {
          duration: 5000,
        });
      }
    );
    this.ngOnInit();
  }

  /**
   * @function removeFavoriteMovies
   * @param {string} movieID - containing the movie ID.
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
        this.snackBar.open('Something is wrong. Please try again', 'OK', {
          duration: 5000,
        });
      }
    );
    this.ngOnInit();
  }

  /**
   * @function getFavoriteMovies
   * Fetches the favorite movies from the database for a logged-in user.
   * This function is called from within [[MovieCardComponent.getMovies]].
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favourites = resp.FavoriteMovies;
    });
  }

  /**
   * @function isFavorite
   * This is called after fetching [[MovieCardComponent.getFavoriteMovies]].
   * This function is called from within [[MovieCardComponent.getMovies]].
   * @param {string} movieId - containing the movie ID.
   */
  isFavorite(movieId: string): boolean {
    return this.favourites.some((movie: any) => movie == movieId);
  }

  /**
   * @function openDescriptionDialog
   * @param {string} movie - an object containing:
   * @param {string} movie.Title - an object element containing the Movie title.
   * @param {string} movie.Description - an object element containing the Movie description.
   * @param {string} movie.imgUrl - an object element containing the Movie image.
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
   * @param {string} Genre - an object containing:
   * @param {string} Genre.Name - an object element containing the Genre name.
   * @param {string} Genre.Description - an object element containing the Genre description.
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
   * @param {string} Director - an object containing:
   * @param {string} Director.Name - an object element containing the Director name.
   * @param {string} Director.BirthYear - an object element containing the Director birthyear.
   * @param {string} Director.Biography - an object element containing the Director biography.
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
   * @param {string} movieID - containing the movie ID.
   * Checks if a favorite movie icon is activated.
   * When a user clicks on the 'empty' icon of the favorite button, a POST request [[FetchApiDataService.addFavoriteMovie]] is sent to the database, add it to the favorite movies.
   * When a user clicks on the 'full' icon of the favorite button, a DELETE request [[FetchApiDataService.removeFavoriteMovie]] is sent to the database to remove it from the favorite list.
   */
  toggleFavorite(movieID: string): void {
    this.isFavorite(movieID)
      ? this.removeFavoriteMovies(movieID)
      : this.addFavoriteToList(movieID);
    this.ngOnInit();
  }
}
