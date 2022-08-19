/**
 * @module FetchApiDataService
 * @description this file contains all the functions for API calls.
 */
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * The root URL for the hosted API.
 * Declaring the API URL that will provide the data, then the user calls it.
 */
const apiUrl = 'https://movies-api-21.herokuapp.com';

@Injectable({
  providedIn: 'root',
})

/**
 * Inject the HttpClient module to the constructor params
 * This will provide HttpClient to the entire class, making it available via this.http
 */
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  /**
   * @function userRegistration
   * @description this function calls the user registration endpoint.
   * @param userDetails {Username: <string>, Password: <string>
   * Email: <string>, BirthDate: <string (optional)>}
   * @returns data for new user in JSON format
   * { _id: <string>,
   *   Username: <string>,
   *   Password: <string> (hashed),
   *   Email: <string>,
   *   Birthday: <string>
   *   FavoriteMovies: []
   * }
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + '/users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * @function userLogin
   * @description this function calls the user login endpoint.
   * @param userDetails {Username: <string>, Password: <string>}
   * @returns  data for logged in user and JWT in JSON format
   * { user: {
   *   _id: <string>,
   *   Username: <string>,
   *   Password: <string> (hashed),
   *   Email: <string>,
   *   Birthday: <string>,
   *   FavoriteMovies: [<string>]
   *   },
   *   token: <string>
   * }
   */
  public userLogin(userDetails: any): Observable<any> {
    //console.log(userDetails);
    return this.http
      .post(apiUrl + '/login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * @function getAllMovies
   * Pulls token from localStorage for auth.
   * @description this function gets all movies data after login.
   * @returns object containing array of data for all movies
   * {[
   *   Genre: { Name: <string>, Description: <string> },
   *   Director: { Name: <string>, Bio: <string>, Birth: <string>, Deth: <string> },
   *   _id: <string>,
   *   Title: <string>,
   *   Description: <string>,
   *   Featured: <boolean>,
   *   ImagePath: <string> (example: "SchindlersList.png"),
   * ]}
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @function getMovie
   * Pulls token from localStorage for authentication
   * @description this function gets the data for one single movie by title.
   * @param Title <any>
   * @returns object containing data for one single movie.
   * {
   *   Genre: { Name: <string>, Description: <string> },
   *   Director: { Name: <string>, Bio: <string>, Birth: <string>, Deth: <string> },
   *   _id: <string>,
   *   Title: <string>,
   *   Description: <string>,
   *   Featured: <boolean>,
   *   ImagePath: <string> (example: "SchindlersList.png"),
   * }
   */
  getMovie(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/' + Title, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @function getDirector
   * Pulls token from localStorage for authentication
   * @description gets one director name from API
   * @param Director {any}
   * @return a director's info in JSON format
   */
  getDirector(Director: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/directors/' + Director, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @function getGenre
   * Pulls token from localStorage for authentication
   * @description gets one genre data from API
   * @param Genre {any}
   * @return one genre's data in JSON format
   */
  getGenre(Genre: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/genres/' + Genre, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @function getUser
   * Pulls token from localStorage for authentication.
   * @description this function calls to get user's data from API.
   * @returns object containing user's data.
   * { _id: <string>,
   *   Username: <string>,
   *   Password: <string> (hashed),
   *   Email: <string>,
   *   Birthday: <string>
   *   FavoriteMovies: [<string>]
   * }
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + '/users/' + username, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @function getFavoriteMovies
   * Pulls token from localStorage for authentication.
   * @description this function gets the movie data of the user's favorite movie.
   * @returns [<string>]
   */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + '/users/' + username + '/movies', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @function addFavoriteMovies
   * Pulls token from localStorage for authentication.
   * @description this function adds a movie to a user's favorite list.
   * @param movieID <any>
   * @returns updated user data
   * { _id: <string>,
   *   Username: <string>,
   *   Password: <string> (hashed),
   *   Email: <string>,
   *   Birthday: <string>
   *   FavoriteMovies: [<string>]
   * }
   */
  public addFavoriteMovie(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .put(apiUrl + '/users/' + username + '/add-movies/' + MovieID, null, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @function deleteFavoriteMovie
   * Pulls token from localStorage for authentication.
   * @description deletes a movie from a user's favorite list.
   * @param movieID <any>
   * @returns updated user data
   * { _id: <string>,
   *   Username: <string>,
   *   Password: <string> (hashed),
   *   Email: <string>,
   *   Birthday: <string>
   *   FavoriteMovies: [<string>]
   * }
   */
  deleteFavoriteMovie(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + '/users/' + username + '/delete-movies/' + movieId, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @function editUser
   * Pulls username and token from local storage to use for endpoint and authorization.
   * @description this function updates the user's account info.
   * @param userDetails {Username: <string>, Password: <string>,
   * Email: <string>, BirthDate: <string>} (all fields optional)
   * @returns updated user info
   * { _id: <string>,
   *   Username: <string>,
   *   Password: <string> (hashed),
   *   Email: <string>,
   *   Birthday: <string>
   *   FavoriteMovies: [<string>]
   * }
   */
  editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .put(apiUrl + '/users/' + username, userDetails, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @function deleteUser
   * Pulls token from localStorage for authentication.
   * @description this funtion deletes the current user's account
   * @returns delete status
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + '/users/' + username, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
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
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }

    return throwError('Something is wrong. Please, try again');
  }
}
