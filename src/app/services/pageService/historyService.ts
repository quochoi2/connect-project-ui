import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class historyService {
  private historyEndpoint = `${environment.BASE_URL}/history`;

  constructor() {}

  async getAllConnectHistories(page: number, limit: number) {
    return await axios.get(this.historyEndpoint, {
      params: { page, limit },
    });
  }

  async historyAddConnect(data: any) {
    return await axios.post(this.historyEndpoint, data);
  }

  async historyDeleteConnect(data: any) {
    return await axios.delete(this.historyEndpoint + '/' + data.id);
  }
}
