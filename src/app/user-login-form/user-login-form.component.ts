/**
 * Renders a login form for the user.
 * @module UserLoginFormComponent
 */
import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
// This imports the dialog
import { MatDialogRef } from '@angular/material/dialog';
// This imports the notifications
import { MatSnackBar } from '@angular/material/snack-bar';
// This imports the routing
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

/**
 * The input userData is empty strings by default.
 * The user updates userData.
 */
export class UserLoginFormComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Password: ''
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * @function loginUser is responsible for sending the form inputs to the backend
   * Attempts to log in the user with user's credentials.
   * Uses [[FetchApiDataService.userLogin]].
   * Saves username and token in localStorage and redirects to `/movies` page upon successful login.
   * Gives a snackbar message if login fails.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      // Logic for the user login
      this.dialogRef.close(); // Closes the modal after login
      localStorage.setItem('user', response.user.Username);
      localStorage.setItem('token', response.token);
      console.log(response);
      this.snackBar.open('Logged In', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (response) => {
      // Catches errors
      this.snackBar.open('User login failed. Try again.', 'OK', {
        duration: 2000
      });
    });
  }
}
