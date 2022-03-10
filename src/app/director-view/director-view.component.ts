/**
 * The Director component renders information about the movie director in a dialog box
 * @module DirectorViewComponent
 */
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})

/**
* @param data is an object containing Director data.
* Must have Name, Bio, Birth, properties as strings
*/
export class DirectorViewComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void { }
}
