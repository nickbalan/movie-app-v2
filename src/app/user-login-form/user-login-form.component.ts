// imports Angular Material UI.
import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
// imports the dialog component.
import { MatDialogRef } from '@angular/material/dialog';
// imports the notification component.
import { MatSnackBar } from '@angular/material/snack-bar';
// imports the router component.
import { Router } from '@angular/router';

/**
 * @module UserLoginFormComponent
 * @description renders a login form for the user.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})

/**
 * @function UserLoginFormComponent
 * @param {string} userData - the user updates userData.
 */
export class UserLoginFormComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Password: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * @function loginUser
   * Sends the form inputs to the backend.
   * Logs into the user with the user's credentials.
   * Uses [[FetchApiDataService.userLogin]].
   * Saves username and token in localStorage and redirects to `/movies` page upon successful login.
   * Gives a snackbar message if the login fails.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        // Logic for the user login
        this.dialogRef.close(); // Closes the modal after login
        localStorage.setItem('user', response.user.Username);
        localStorage.setItem('token', response.token);
        //console.log(response);
        this.snackBar.open('Logged In', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (response) => {
        // Catches errors
        this.snackBar.open('User login failed. Try again.', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
