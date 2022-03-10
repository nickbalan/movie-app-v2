/**
 * Renders user profile information
 * Renders the favorite movies list in the user profile.
 * Renders The Nav-Bar Component.
 *
 * @module UserProfileComponent
 */
// Imports Angular Material UI
import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
// Imports App comptonents
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  /**
   * The user updates the 'userData'.
   */
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
    FavoriteMovies: [],
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  /**
   * Stores data about each movie.
   */
  movies: any[] = [];

  /**
   * A subset of movies containing only the user's favorite list.
   */
  userFavouritesMovies: any[] = [];

  /**
   * Fetches the data of the logged-in user.
   * Then, downloads all the movie data and maps of the user's favorite movies.
   * If the API call fails for some reason, 
   * then the user will be logged out and returned to the welcome screen.
   */
  ngOnInit(): void {
    this.getUser();
    this.getMovies();
  }

  /**
   * @function removeFavoriteMovies,
   * @param movieID string containing the ID of a movie,
   * remove the movie ID from the user's favorite list,
   * with DELETE request [[FetchApiDataService.removeFavoriteMovie]].
   * Then, reloads the user's profile page, to update the user's favorite list.
   */
  removeFavoriteMovies(movieID: any): void {
    this.fetchApiData.deleteFavoriteMovie(movieID).subscribe(
      (response: any) => {
        this.snackBar.open('Movie has been removed', 'Ok', {
          duration: 2000,
        });
        this.ngOnInit();
      },
      // error handler
      (response: any) => {
        this.snackBar.open(
          'Something is wrong. Please, try again', 'OK', {
          duration: 2000,
        }
        );
      }
    );
    this.ngOnInit();
  }

  /**
   * @function getMovies
   * Downloads all the movie data and save it into this.movies.
   * Then filter out the favorite movie list and save them into this.favoriteMovies.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (resp: any) => {
        this.movies = resp;
        if (this.userData.FavoriteMovies) {
          this.userFavouritesMovies = this.userData.FavoriteMovies.map(
            (_id: string) => {
              return this.movies.find((movie: any) => {
                return movie._id === _id;
              });
            }
          );
        }
        console.log('this.userFavouritesMovies ', this.userFavouritesMovies);
        console.log('this.movies ', this.movies);
      },
      (error: any) => {
        console.error(error);
      }
    );
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
   * @param Director {Name: <string>, Bio: <string>, Birth: <string>}
   * Opens a dialog box with a DirectorViewComponent, passing the Director data into the component.
   */
  openDirectorDialog(Director: any): void {
    this.dialog.open(DirectorViewComponent, {
      width: '280px',
      data: { Director },
    });
  }

  /**
   * When user clicks on Delete Profile button,
   * then DELETE the account profile.
   */
  openDialog() {
    this.dialog.open(DeleteAccountComponent);
  }

  /**
   * API is called to get data for the user.
   * Pulls token from localStorage.
   * @returns object containing data for the user:
   * {[  _id: <string>,
   *     Username: <string>,
   *     Password: <string> (hashed),
   *     Email: <string>,
   *     Birthday: <string>
   *     FavoriteMovies: [<string>]
   * ]}
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.userData.Username = resp.Username;
      this.userData.Email = resp.Email;
      this.userData.Birthday = formatDate(resp.Birthday, 'yyyy-MM-dd', 'en_US');
      this.userData.FavoriteMovies = resp.FavoriteMovies;
      return this.userData;
    });
  }

  /**
   * Updates the user's data. 
   * Only sends data to the server for fields that have been updated.
   * If the data is formatted poorly, 
   * then an error from the server should trigger a warning message,
   * to the user to check their data format.
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (response: any) => {
        localStorage.setItem('username', response.Username);
        this.snackBar.open(
          response.Username + ' You have successfully updated your Profile',
          '',
          {
            duration: 2000,
          }
        );
      },
      // Error handler
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }

}
