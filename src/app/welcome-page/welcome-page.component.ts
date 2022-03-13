/**
 * The login landing page for users.
 * Renders login and registration components and buttons.
 * @module WelcomePageComponent
 */
import { Component, OnInit } from '@angular/core';
// Import App Components
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
// Import Angular Material UI
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  /**
   * This function will open the dialog box when the signup button is clicked
   * Opens a dialog box with [[UserRegistrationFormComponent]]
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning a width to the dialog box
      width: '280px'
    });
  }

  /**
   * @function openUserLoginDialog
   * This function checks first if a JWT is saved in the localStorage.
   * If the user is already logged in and have a valid JWT saved in localStorage,
   * Then the user is redirected to the /movies (MovieCardComponent) page.
   * Otherwise, if the user has a JWT saved but it is invalid for some reason, 
   * then the user will be logged out.
   * This function will open the dialog box when the signin button is clicked
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assigning a width to the dialog box
      width: '280px'
    });
  }
}
