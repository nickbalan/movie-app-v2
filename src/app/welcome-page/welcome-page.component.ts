/**
 * @description renders login and registration components and buttons.
 * @module WelcomePageComponent
 */
// imports Angular components.
import { Component, OnInit } from '@angular/core';
// import App's components.
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
// import Angular Material UI components.
import { MatDialog } from '@angular/material/dialog';

/**
 * @module WelcomePageComponent
 * @description renders login and registration components and buttons.
 * * The login landing page for users.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  /**
   * @function openUserRegistrationDialog
   * @description when users click on the signup button, it opens the dialog box with [[UserRegistrationFormComponent]].
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigned a width to the dialog box.
      width: '280px',
    });
  }

  /**
   * @function openUserLoginDialog
   * @description if the user is logged in, check the localStorage a saved and valid JWT token, and redirect the user to the /movies (MovieCardComponent) page.
   * * Otherwise, if the user has a JWT saved but is not valid, then the user will be logged out.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assigning a width to the dialog box.
      width: '280px',
    });
  }
}
