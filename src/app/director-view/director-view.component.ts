import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Renders information about the movie director in a dialog box:
 * @module DirectorViewComponent
 */
@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss'],
})

/**
 * @param  data - an object containing Director data:
 * @param {string} data.Director.Name - an object element containing the Director name.
 * @param {string} data.Director.BirthYear - an object element containing the Director birthyear.
 * @param {string} data.Director.Biography - an object element containing the Director biography.
 * Must have the following string properties: Name, Birth, Biography.
 */
export class DirectorViewComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}