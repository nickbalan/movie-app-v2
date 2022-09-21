/**
 * @description renders login and registration components and buttons.
 * * Sets a Class Decorator for the WelcomePage component.
 * * The login page for users.
 * @module WelcomePageComponent
 */
// imports Angular modules, hooks, and decorators.
import { Component, OnInit } from '@angular/core';
// imports App's modules.
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
// imports Angular Material UI services.
import { MatDialog } from '@angular/material/dialog';

/**
 * @module WelcomePageComponent
 * @description renders login and registration components and buttons.
 * * Sets a Class Decorator for the WelcomePage component.
 * * The login page for users.
 */
@Component({
  /* Sets a Class Decorator for the WelcomePage component. */
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  /**
   * @function openUserRegistrationDialog
   * @description opens the signup form component with buttons[[UserRegistrationFormComponent]].
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigned a width to the dialog box.
      width: '280px',
    });
  }

  /**
   * @function openUserLoginDialog
   * @description if the user is logged in, then checks the localStorage a saved and valid JWT token, and redirect the user to the /movies (MovieCardComponent) page.
   * * Otherwise, if the user has a JWT saved but is not valid, then the user will be logged out.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assigning a width to the dialog box.
      width: '280px',
    });
  }
}
