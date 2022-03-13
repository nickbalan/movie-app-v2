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


// Declaring the API url that will provide data for the client App
const apiUrl = 'https://movies-api-21.herokuapp.com';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the API call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
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
   * @param Director {any}
   * @return a director's info in json format
   */
  getDirector(Director: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/directors/' + Director, {
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
   * @param Genre {any}
   * @return a genre data in json format
   */
  getGenre(Genre: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/genres/' + Genre, {
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
   * @return a user's information in json format
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + '/users/' + username, {
        headers: new HttpHeaders({ Authrization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Get the favorite movies from API
   * @function getFavoriteMovies
   * @returns a list of the user's favorite movies in json format
   */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + '/users/' + username + '/movies', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Add a movie to favourite Movies
   * @function addFavoriteMovie
   * @param MovieID {any}
   * @returns the user's favorite list in json format
   */
  addFavoriteMovie(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .put(apiUrl + '/users/' + username + '/add-movies/' + MovieID, null, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Delete a movie from the favorite movies list
   * @function deleteFavoriteMovie
   * @param MovieID {any}
   * @returns updated user's information in json format after removed one favorite movie
   */
  deleteFavoriteMovie(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + '/users/' + username + '/delete-movies/' + MovieID, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Edit user's info from API
   * @function editUser
   * @param userDetails {any}
   * @returns updated user's informations in json format
   */
  editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .put(apiUrl + '/users/' + username, userDetails, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * call API end-point to delete the current user
   * @function deleteUser
   * @returns delete status
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + '/users/' + username, {
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
      'Something is wrong. Please, try again');
  }
}