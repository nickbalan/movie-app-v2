/**
 * @description renders a registration form to register a new account.
 * * Sets a Class Decorator for the UserRegistrationForm component.
 * * Sets a Parameters Decorator for the UserRegistrationForm component.
 * * The user updates the userData.
 * @module UserRegistrationFormComponent
 */
// imports Angular modules, hooks, and decorators.
import { Component, OnInit, Input } from '@angular/core';
// imports App's services.
import { FetchApiDataService } from '../fetch-api-data.service';
// imports Angular Material UI services.
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @module UserRegistrationFormComponent
 * @description renders a registration form for users to make a new account.
 * * Sets a Class Decorator for the UserRegistrationForm component.
 * * Sets a Parameters Decorator for the UserRegistrationForm component.
 * * The user updates the userData.
 * @param {string} userData - an object containing:
 * @param {string} userData.Username - an object element containing the Username of the user.
 * @param {string} userData.Password - an object element containing the Password of the user.
 * @param {string} userData.Email - an object element containing the Email of the user.
 * @param {string} userData.Birthday - an object element containing the Birthday of the user.
 */
@Component({
  /* Sets a Class Decorator for the UserRegistrationForm component. */
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  /* Sets a Parameters Decorator for the UserRegistrationForm component. */
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * @function registerUser
   * @description sends the inputs form to the backend.
   * * Registers into the user with the user's credentials.
   * * Uses [[FetchApiDataService.userRegistration]].
   * * Upon sucessful registration, the user can log in.
   * * Gives a snackbar message if the registration fails.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response) => {
        // Logic for the user registration
        this.dialogRef.close(); // Closes the modal after registration
        //console.log(response);
        this.snackBar.open('Registration complete', 'OK', {
          duration: 2000,
        });
      },
      (response) => {
        // Catches errors
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
