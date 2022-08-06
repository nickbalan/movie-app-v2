import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Renders information about the movie director in a dialog box
 * @module DirectorViewComponent
 */
@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss'],
})

/**
 * @param data is an object containing Director data.
 * Must have the following string properties Name, Bio, Birth.
 */
export class DirectorViewComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
