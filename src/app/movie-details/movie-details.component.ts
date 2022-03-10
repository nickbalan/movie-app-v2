/**
 * The Description component renders the discription of the movie in a dialog box
 * @module MovieDetailsComponent
 */
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})

/**
 * @param data an object containing movie data.
 * Must have Title and Description parameters both as strings.
 */
export class MovieDetailsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void { }
}
