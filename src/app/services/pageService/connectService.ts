import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { authService } from '../authService';
import { BaseService } from '../baseService';

@Injectable({
  providedIn: 'root',
})
export class connectService extends BaseService {
  constructor(authService: authService) {
    super(authService);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // admin
  public getAllConnects(page: number, limit: number) {
    return this.paginateRepository('/connect', { page, limit });
  }

  public openConnect(id: number) {
    return this.updateStatusRepository(`/connect/${id}/open`);
  }

  public closeConnect(id: number) {
    return this.updateStatusRepository(`/connect/${id}/close`);
  }

  // user
  public getAllConnectByUserId(page: number, limit: number, userId: number) {
    return this.paginateRepository('/connect/user/' + userId, {
      page,
      limit,
    });
  }

  public createConnect(data: any, userId: number) {
    return this.createRepository('/connect?id=' + userId, data);
  }

  public updateConnect(data: any) {
    return this.updateRepository(`/connect/` + data.id, data);
  }

  public sendConnect(id: number) {
    return this.updateStatusRepository(`/connect/${id}/send`);
  }

  public deleteConnect(id: any) {
    return this.deleteRepository(`connect/` + id);
  }
}
