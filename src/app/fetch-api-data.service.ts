import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import {
  Observable,
  throwError
} from 'rxjs';
import { map, catchError } from 'rxjs/operators';


// Declaring the api url that will provide data for the client app
const apiUrl = 'https://movies-api-21.herokuapp.com';

@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the API call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + '/users', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Call the user login end-point from API
   * @param userDetails {any}
   * @returns user's data in json format
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + '/login', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Call and get all movies from API
   * @function getAllMovies
   * @return array of movies object in json format
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies', {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Get one movie by Title from API
   * @function getMovie
   * @param Title {any}
   * @returns a movie object in json format
   */
  getMovie(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/' + Title, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Get one director Name from API
   * @function getDirector
   * @param Name {any}
   * @return a director's info in json format
   */
  getDirector(Name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/directors/' + Name, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Get one genre info from API
   * @function getGenre
   * @param Name {any}
   * @return a genre data in json format
   */
  getGenre(Name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/genres/' + Name, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Get the user info from API
   * @function getUser
   * @param Username {any}
   * @return a user's information in json format
   */
  getUser(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/users/' + Username, {
        headers: new HttpHeaders({ Authrization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Get the favorite movies from API
   * @param Username {any}
   * @returns a list of the user's favorite movies in json format
   */
  getFavoriteMovies(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/users/' + Username + '/movies', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Add a movie to favourite Movies
   * @param MovieID {any}
   * @returns the user's favorite list in json format
   */
  addFavoriteMovie(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http
      .post(apiUrl + '/users/' + Username + '/add-movies/' + MovieID, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // 
  /**
   * Delete a movie from the favorite movies list
   * @param MovieID {any}
   * @returns updated user's information in json format after removed one favorite movie
   */
  deleteFavoriteMovie(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http
      .delete(apiUrl + '/users/' + Username + '/delete-movies/' + MovieID, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Edit user's info from API
   * @param Username {any}
   * @param userDetails {any}
   * @returns updated user's informations in json format
   */
  editUser(Username: any, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + '/users/' + Username, userDetails, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Delete the user info from API
  /**
   * call API end-point to delete the current user
   * @param Username {any}
   * @returns delete status
   */
  deleteUser(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + '/users/' + Username, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
  * Non-typed response extracttion
  * @param res {any}
  * @returns response || empty object
  */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  // Error handler
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }

    return throwError(
      'Something bad happened; please try again later.');
  }
}