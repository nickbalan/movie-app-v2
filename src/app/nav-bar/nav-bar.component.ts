/**
 * @description displays the navigation menu with MyFlix, Profile, and Logout buttons.
 * * Sets a Class Decorator for the NavBarComponent.
 * * When a user clicks on links, it renders MyFlix (all movies), Profile (user profile), and Logout (logging out from the account).
 * @module NavBarComponent
 */
// imports Angular components.
import { Component, OnInit } from '@angular/core';
// imports Angular Router components.
import { Router } from '@angular/router';

/**
 * @module NavBarComponent
 * @description displays the navigation menu with MyFlix, Profile, and Logout buttons.
 * * Sets a Class Decorator for the NavBarComponent.
 * * When a user clicks on links, it renders MyFlix (all movies), Profile (user profile), and Logout (logging out from the account).
 */
@Component({
  /* Sets a Class Decorator for the NavBarComponent. */
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * @function toProfile
   * @description when a user clicks on the Profile button, it navigates to the user profile.
   */
  toProfile(): void {
    this.router.navigate(['users']);
  }

  /**
   * @function logout
   * @description when a user clicks on the Logout button, it logs out the user and clears the localStorage; then, navigate to the welcome page.
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }

  /**
   * @function toMovies
   * @description when a user clicks on the MyFlix button, it navigates to the 'movies' page.
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }
}
