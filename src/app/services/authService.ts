import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class authService {
  private signinEndpoint = `${environment.BASE_URL}/user/signin`;
  private signupEndpoint = `${environment.BASE_URL}/user/signup`;

  constructor() {}

  async signin(credentials: { email: string; password: string }) {
    try {
      const response = await axios.post(this.signinEndpoint, credentials);
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: response.data.id,
          name: response.data.name,
          role: response.data.role,
        })
      );
      return response.data;
    } catch (error) {
      console.error('Error during signin:', error);
      throw error;
    }
  }

  async signup(data: { name: string; email: string; password: string }) {
    try {
      const response = await axios.post(this.signupEndpoint, data);
      return response.data;
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
