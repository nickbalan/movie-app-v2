/**
 * @description renders the discription of the Movie in a dialog box.
 * * Sets a Class Decorator for the MovieDetailsComponent.
 * * Sets a Parameters Decorator for the MovieDetailsComponent.
 * @module MovieDetailsComponent
 */
// imports Angular components.
import { Component, OnInit, Inject } from '@angular/core';
// imports Angular Material UI components.
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @module MovieDetailsComponent
 * @description renders the discription of the Movie in a dialog box.
 * * Sets a Class Decorator for the MovieDetailsComponent.
 * * Sets a Parameters Decorator for the MovieDetailsComponent.
 * @param {string} data - an object containing Movie data:
 * @param {string} data.movie.Title - an object element containing the Movie title.
 * @param {string} movie.movie.Description - an object element containing the Movie description.
 * @param {string} movie.movie.imgUrl - an object element containing the Movie image.
 */
@Component({
  /* Sets a Class Decorator for the MovieDetailsComponent. */
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  /* Sets a Parameters Decorator for the MovieDetailsComponent. */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
