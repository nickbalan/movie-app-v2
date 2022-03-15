/**
 * Renders a registration form for users to make a new account.
 * The user must supply a valid Username, Password, Email, and (optional) Birthday.
 * @module UserRegistrationFormComponent
 */
import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
// Import Angular Material UI
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

/**
 * The input userData is empty strings by default.
 * The user updates the userData.
 */
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  /**
   * @function registerUser
   * This is the function responsible for sending the form inputs to the backend
   * Attempts to register the user with user's credentials.
   * Uses [[FetchApiDataService.userRegistration]].
   * Upon sucessful registration, the user can log in.
   * Gives a snackbar message if the regsitration fails.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // Logic for the user registration
      this.dialogRef.close(); // Closes the modal after registration
      //console.log(response);
      this.snackBar.open('Registration complete', 'OK', {
        duration: 2000
      });
    }, (response) => {
      // Catches errors
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}
