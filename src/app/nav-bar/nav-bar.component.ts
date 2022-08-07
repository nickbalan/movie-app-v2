import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Displays the navigation menu with MyFlix, Profile, and Logout buttons:
 * @module NavBarComponent
 */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})

/**
 * When a user clicks on links, it renders MyFlix (all movies), Profile (user profile), and Logout (logging out from the account).
 */
export class NavBarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * When a user clicks on the Profile button, it navigates to the user profile.
   */
  toProfile(): void {
    this.router.navigate(['users']);
  }

  /**
   * When a user clicks on the Logout button, it logs out the user and clears the localStorage; then, navigate to the welcome page.
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }

  /**
   * When a user clicks on the MyFlix button, it navigates to the 'movies' page.
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }
}
