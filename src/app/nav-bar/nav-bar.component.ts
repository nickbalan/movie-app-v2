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
   * Navigates to `'/profile'`
   * This is called from a button.
   */
   toProfile(): void {
    this.router.navigate(['users']);
  }

  /**
   * Logs out the user by clearing localStorage and navigating to `'/welcome'`
   * This is called from a logout button.
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }

  /**
   * Navigates to `'movies'`
   * This is called from the page logo-button.
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }
}
