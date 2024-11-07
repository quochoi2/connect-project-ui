import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, map, from } from 'rxjs';

const API_URL = environment.BASE_URL + '/auth';

@Injectable({
  providedIn: 'root',
})
export class authService {
  public currentUser: Observable<any>;
  private currentUserSubject: BehaviorSubject<any>;

  constructor() {
    let storageUser;
    const storageUserAsStr = localStorage.getItem('user');
    if (storageUserAsStr) {
      storageUser = JSON.parse(storageUserAsStr);
    }

    this.currentUserSubject = new BehaviorSubject<any>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  signIn(user: any): Observable<any> {
    return from(
      axios.post(API_URL + '/signin', {
        email: user.email,
        password: user.password,
      })
    ).pipe(
      map((res: any) => {
        const data = res.data;
        if (data && data.success) {
          localStorage.setItem('token', data.data.token.accessToken);

          const payload = data.data.token.accessToken.split('.')[1];
          const decodedPayload = JSON.parse(atob(payload));
          console.log(decodedPayload);

          const dataUser = {
            id: decodedPayload.userId,
            name: decodedPayload.name,
            email: decodedPayload.email,
            role: decodedPayload.role,
          };
          localStorage.setItem('user', JSON.stringify(dataUser));
          this.currentUserSubject.next(dataUser);
        }
        return data;
      })
    );
  }

  signUp(user: any): Observable<any> {
    return from(axios.post(API_URL + '/signup', user));
  }

  signOut() {
    localStorage.clear();
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  // getUser(): any {
  //   const user = localStorage.getItem('user');
  //   return user ? user : null;
  // }
}
