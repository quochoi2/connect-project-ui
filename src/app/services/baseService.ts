import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, from } from 'rxjs';
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { authService } from './authService';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService extends BehaviorSubject<any> {
  protected api: AxiosInstance;
  protected currentUser: any | null = null;

  constructor(protected authService: authService) {
    super({ data: [], total: 0 });
    this.authService.currentUser.subscribe((data: any) => {
      this.currentUser = data;
      // console.log("Base Request: ", this.currentUser);
    });

    this.api = axios.create({
      baseURL: environment.BASE_URL,
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  protected paginateRepository<T>(url: string, params?: any): Promise<T> {
    return this.api.get<T>(url, { params }).then((res) => res.data);
  }

  protected createRepository<T>(url: string, data?: any): Promise<T> {
    return this.api.post<T>(url, data).then((response) => response.data);
  }

  protected updateRepository<T>(url: string, data?: any): Promise<T> {
    return this.api.put<T>(url, data).then((response) => response.data);
  }

  protected updateStatusRepository<T>(url: string, data?: any): Promise<T> {
    return this.api.post<T>(url, data).then((response) => response.data);
  }

  protected deleteRepository<T>(url: string): Promise<T> {
    return this.api.delete<T>(url).then((response) => response.data);
  }
}
