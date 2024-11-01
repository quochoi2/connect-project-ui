import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class connectService {
  private connectEndpoint = `${environment.BASE_URL}/connect`;

  constructor() {}

  private buildUrl(id?: number | string, action?: string) {
    return `${this.connectEndpoint}${id ? `/${id}` : ''}${
      action ? `/${action}` : ''
    }`;
  }

  async getAllConnects(page: number, limit: number) {
    return axios.get(this.connectEndpoint, { params: { page, limit } });
  }

  async getAllConnectAfterDeleted(page: number, limit: number) {
    return axios.get(this.buildUrl('getAllAfterDeleted'), {
      params: { page, limit },
    });
  }

  async openConnect(id: number, moderator: string) {
    return axios.post(this.buildUrl(id, 'open'), null, {
      params: { moderator },
    });
  }

  async closeConnect(id: number) {
    return axios.post(this.buildUrl(id, 'close'));
  }

  async getAllConnectByUserId(page: number, limit: number, userId: number) {
    return axios.get(this.buildUrl(`user/${userId}`), {
      params: { page, limit },
    });
  }

  async createConnect(data: any, userId: number) {
    return axios.post(this.connectEndpoint, { ...data, user_id: userId });
  }

  async updateConnect(data: any) {
    return axios.put(this.buildUrl(data.id), data);
  }

  async deleteConnect(id: number) {
    return axios.delete(this.buildUrl(id));
  }

  async softDeleteConnect(id: number) {
    return axios.delete(this.buildUrl(id, 'softDelete'));
  }

  async restoreConnect(id: number) {
    return axios.post(this.buildUrl(id, 'restore'));
  }
}
