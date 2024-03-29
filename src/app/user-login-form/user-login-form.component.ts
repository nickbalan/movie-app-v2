/**
 * @description renders a login form for the user.
 * * Sets a Class Decorator for the UserLoginForm component.
 * * Sets a Parameters Decorator for the UserLoginForm component.
 * @module UserLoginFormComponent
 */
// imports Angular modules, hooks, and decorators.
import { Component, OnInit, Input } from '@angular/core';
// improts App's services.
import { FetchApiDataService } from '../fetch-api-data.service';
// imports Angular Material UI services.
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// imports Angular Router services.
import { Router } from '@angular/router';

/**
 * @module UserLoginFormComponent
 * @description renders a login form component.
 * * Sets a Class Decorator for the UserLoginForm component.
 * * Sets a Parameters Decorator for the UserLoginForm component.
 */
@Component({
  /* Sets a Class Decorator for the UserLoginForm component. */
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  /* Sets a Parameters Decorator for the UserLoginForm component. */
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
   * @description sends the inputs form to the backend.
   * * Logs into the user with the user's credentials.
   * * Uses [[FetchApiDataService.userLogin]].
   * * Saves username and token in localStorage and redirects to `/movies` page upon successful login.
   * * Gives a snackbar message if the login fails.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        // Logic for the user login
        this.dialogRef.close(); // Closes the modal after login.
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
