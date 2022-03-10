/**
 * The NavBar displays the navigation meniu. 
 * The NavBar has the MyFlix, Profile, and Logout button.
 * Depending on which navigation button is clicked, the NavBar will render it.
 * @module NavBarComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void { }

  /**
   * If the user clicks on the Profile button, 
   * then navigate to the user profile
   */
   toProfile(): void {
    this.router.navigate(['users']);
  }

  /**
   * If the user clicks on the Logout button,
   * then log out the user and clear localStorage;
   * after that, navigate to the welcome page.
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }

  /**
   * If the user clicks on the MyFlix button,
   * then navigate to 'movies' page
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }
}
