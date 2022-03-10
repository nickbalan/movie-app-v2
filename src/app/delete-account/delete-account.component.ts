/**
 * Renders a form for delete user account.
 * @module DeleteUserComponent
 */
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  /**
   * Deletes the user account. with [[FetchApiDataService.deleteUser]].
   * @function deleteUser
   * Clears the localStorage and navigates to the welcome page.
   */
  deleteUser(): void {
    this.router.navigate(['welcome']);
    this.fetchApiData.deleteUser().subscribe(
      () => { },
      // Error handler
      (response) => {
        this.snackBar.open(
          'Your Account has been successfully deleted', 'OK', {
          duration: 5000,
        }
        );
      }
    );
    localStorage.clear();
  }
}
