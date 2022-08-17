// imports Angular Material UI.
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @module MovieDetailsComponent
 * @description renders the discription of the Movie in a dialog box.
 */
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})

/**
 * @param {string} data - an object containing Movie data:
 * @param {string} data.movie.Title - an object element containing the Movie title.
 * @param {string} movie.movie.Description - an object element containing the Movie description.
 * @param {string} movie.movie.imgUrl - an object element containing the Movie image.
 */
export class MovieDetailsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
