// imports Angular components.
import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
// import Angular Material UI.
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @module UserRegistrationFormComponent
 * @description renders a registration form for users to make a new account.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})

/**
 * The user updates the userData.
 * @param {string} userData - an object containing:
 * @param {string} userData.Username - an object element containing the Username of the user.
 * @param {string} userData.Password - an object element containing the Password of the user.
 * @param {string} userData.Email - an object element containing the Email of the user.
 * @param {string} userData.Birthday - an object element containing the Birthday of the user.
 */
export class UserRegistrationFormComponent implements OnInit {
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
   * Sends the inputs form to the backend.
   * Registers into the user with the user's credentials.
   * Uses [[FetchApiDataService.userRegistration]].
   * Upon sucessful registration, the user can log in.
   * Gives a snackbar message if the registration fails.
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
