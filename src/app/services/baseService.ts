import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected http: HttpClient;
  protected apiUrl: string = environment.BASE_URL;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllPaginate<T>(
    endpoint: string,
    page: number,
    limit: number
  ): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}?page=${page}&limit=${limit}`;
    return this.http.get<T>(url, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
