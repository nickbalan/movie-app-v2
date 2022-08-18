// imports Angular components.
import { Component, OnInit } from '@angular/core';
// imports Angular Material UI components.
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// imports Angular Router components.
import { Router } from '@angular/router';

/**
 * @module DeleteAccountComponent
 * @description renders a form for deleting a user account.
 */
@Component({
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
