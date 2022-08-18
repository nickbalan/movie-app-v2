// imports Angular components.
import { Component, OnInit, Inject } from '@angular/core';
// imports Angular Material UI components.
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @module GenreViewComponent
 * @description renders the data about the movie genre in a dialog box.
 */
@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss'],
})

/**
 * @param {string} data - an object containing the Genre data:
 * @param {string} data.Genre.Name - an object element containing the Genre name.
 * @param {string} data.Genre.Description - an object element containing the Genre description.
 * Must have the following string properties: Name and Description.
 */
export class GenreViewComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
