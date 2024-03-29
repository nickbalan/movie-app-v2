/**
 * @description renders the discription of the Movie in a dialog box.
 * * Sets a Class Decorator for the MovieDetails component.
 * * Sets a Parameters Decorator for the MovieDetails component.
 * @module MovieDetailsComponent
 */
// imports Angular modules, hooks, and decorators.
import { Component, OnInit, Inject } from '@angular/core';
// imports Angular Material UI services.
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @module MovieDetailsComponent
 * @description renders the discription of the Movie in a dialog box.
 * * Sets a Class Decorator for the MovieDetails component.
 * * Sets a Parameters Decorator for the MovieDetails component.
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
  /* Sets a Parameters Decorator for the MovieDetails component. */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
