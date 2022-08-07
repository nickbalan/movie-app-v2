import { Component, OnInit } from '@angular/core';
// Import App Components
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
// Import Angular Material UI
import { MatDialog } from '@angular/material/dialog';

/**
 * Renders login and registration components and buttons:
 * @module WelcomePageComponent
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})

/**
 * The login landing page for users.
 */
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  /**
   * @function openUserRegistrationDialog
   * When users click on the signup button, it opens the dialog box with [[UserRegistrationFormComponent]].
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigned a width to the dialog box.
      width: '280px',
    });
  }

  /**
   * @function openUserLoginDialog
   *
   * If the user is logged in, check the localStorage a saved and valid JWT token, and redirect the user to the /movies (MovieCardComponent) page.
   * Otherwise, if the user has a JWT saved but is not valid, then the user will be logged out.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assigning a width to the dialog box.
      width: '280px',
    });
  }
}
