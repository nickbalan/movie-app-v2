import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

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

  // Sends the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // Logic for the user registration
      this.dialogRef.close(); // Closes the modal after registration
      console.log(response);
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
