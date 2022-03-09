import { Component, OnInit, Input } from '@angular/core';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
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
  ) { }
  movies: any[] = [];
  userFavouritesMovies: any[] = [];

  ngOnInit(): void {
    this.getUser();
    this.getMovies();
  }

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

  openDialog() {
    this.dialog.open(DeleteAccountComponent);
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.userData.Username = resp.Username;
      this.userData.Email = resp.Email;
      this.userData.Birthday = formatDate(resp.Birthday, 'yyyy-MM-dd', 'en_US');
      this.userData.FavoriteMovies = resp.FavoriteMovies;
      return this.userData;
    });
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (response: any) => {
        localStorage.setItem('username', response.Username);
        // Logic for a successful user update goes here! (To be implemented)
        this.snackBar.open(
          response.Username + ' You have successfully updated your Profile',
          '',
          {
            duration: 2000,
          }
        );
      },
      // in case of error, the error will be catched below
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }

}
