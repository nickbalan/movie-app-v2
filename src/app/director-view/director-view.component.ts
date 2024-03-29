/**
 * @description renders information about the movie director in a dialog box.
 * * Sets a Class Decorator for the DirectorView component.
 * * Sets a Parameters Decorator for the DirectorView component.
 * @module DirectorViewComponent
 */
// imports Angular modules, hooks, and decorators.
import { Component, OnInit, Inject } from '@angular/core';
// imports Angular Material UI services.
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @module DirectorViewComponent
 * @description renders information about the movie director in a dialog box.
 * * Sets a Class Decorator for the DirectorView component.
 * * Sets a Parameters Decorator for the DirectorView component.
 * @param {object} data - an object containing Director data:
 * @param {string} data.Director.Name - an object element containing the Director name.
 * @param {string} data.Director.BirthYear - an object element containing the Director birthyear.
 * @param {string} data.Director.Biography - an object element containing the Director biography.
 */
@Component({
  /* Sets a Class Decorator for the DirectorView component. */
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss'],
})
export class DirectorViewComponent implements OnInit {
  /* Sets a Parameters Decorator for the DirectorView component. */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
