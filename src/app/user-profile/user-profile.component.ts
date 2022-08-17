// imports Angular Material UI.
import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
// imports Angular components.
import { FetchApiDataService } from '../fetch-api-data.service';
// imports App's comptonents.
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';

/**
 * @module UserProfileComponent
 * @description renders the user profile information.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})

/**
 * Renders the favorite movies list in the user profile.
 * Renders the NavBar component.
 * @param {string} userData - an object containing:
 * @param {string} userData.Username - an object element containing the Username of the user.
 * @param {string} userData.Password - an object element containing the Password of the user.
 * @param {string} userData.Email - an object containing the Email of the user.
 * @param {string} userData.FavoriteMovies - an object containing the Favorite movies of the user.
 */
export class UserProfileComponent implements OnInit {
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
  ) {}

  /**
   * Stores the data about each movie.
   */
  movies: any[] = [];

  /**
   * Stores a subset of movies containing only the user's favorite movie list.
   */
  userFavouritesMovies: any[] = [];

  /**
   * Fetches the logged-in user's data, downloads all the movie data, and maps the user's favorite movies.
   * If the API call fails, the user will be logged out and returned to the welcome screen.
   */
  ngOnInit(): void {
    this.getUser();
    this.getMovies();
  }

  /**
   * @function removeFavoriteMovies
   * @param {string} movieID - string containing the movie ID.
   * Remove the movie ID from the user's favorite list using the DELETE request [[FetchApiDataService.removeFavoriteMovie]].
   * Then, reloads the user's profile page to update the user's favorite list.
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
        this.snackBar.open('Something is wrong. Please, try again', 'OK', {
          duration: 2000,
        });
      }
    );
    this.ngOnInit();
  }

  /**
   * @function getMovies
   * @returns - downloads all the movie data and save it into this.movies.
   * @returns - then, filter out the favorite movie list and save them into this.favoriteMovies.
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
        //console.log('this.userFavouritesMovies ', this.userFavouritesMovies);
        //console.log('this.movies ', this.movies);
      },
      (error: any) => {
        console.error(error);
      }
    );
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
   * When the user clicks on the Delete button from Profile, then DELETE the account profile.
   */
  openDialog() {
    this.dialog.open(DeleteAccountComponent);
  }

  /**
   * Then, it calls the API to get data for the user and Pulls the token from localStorage.
   * @returns - an object containing data for the user:
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
   * Then, it updates the user's data and sends data (the updated fields) to the database.
   * If the data is formatted poorly, then an error from the server should trigger a warning message to check the data format.
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
