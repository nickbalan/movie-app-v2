/**
 * @description renders a form for deleting a user account.
 * * Sets a Class Decorator for the DeleteAccount component.
 * @module DeleteAccountComponent
 */
// imports Angular modules, hooks, and decorators.
import { Component, OnInit } from '@angular/core';
// improts App's services.
import { FetchApiDataService } from '../fetch-api-data.service';
// imports Angular Material UI services.
import { MatSnackBar } from '@angular/material/snack-bar';
// imports Angular Router services.
import { Router } from '@angular/router';

/**
 * @module DeleteAccountComponent
 * @description renders a form for deleting a user account.
 * * Sets a Class Decorator for the DeleteAccount component.
 */
@Component({
  /* Sets a Class Decorator for the DeleteAccount component. */
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
})
export class DeleteAccountComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * @function deleteUser
   * @description deletes the user account with [[FetchApiDataService.deleteUser]].
   * @returns clears the localStorage and navigates to the welcome page.
   */
  deleteUser(): void {
    this.router.navigate(['welcome']);
    this.fetchApiData.deleteUser().subscribe(
      () => {},
      // Error handler
      (response) => {
        this.snackBar.open('Your Account has been successfully deleted', 'OK', {
          duration: 5000,
        });
      }
    );
    localStorage.clear();
  }
}
