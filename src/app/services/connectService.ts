import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class connectService {
  private connectEndpoint = `${environment.BASE_URL}/connect`;

  constructor() {}

  async getAllConnects(page: number, limit: number) {
    return await axios.get(this.connectEndpoint, {
      params: { page, limit },
    });
  }

  async getAllConnectByUserId(page: number, limit: number, userId: number) {
    return await axios.get(this.connectEndpoint + '/user/' + userId, {
      params: { page, limit },
    });
  }

  // async getAllHistoryConnects(page: number, limit: number) {
  //   return await axios.get(this.connectEndpoint + '/', {
  //     params: { page, limit },
  //   });
  // }

  async getAllConnectAfterDeleted(page: number, limit: number) {
    return await axios.get(this.connectEndpoint + '/getAllAfterDeleted', {
      params: { page, limit },
    });
  }

  async openConnect(id: number, moderator: string) {
    return await axios.post(this.connectEndpoint + '/' + id + '/open', null, {
      params: {
        moderator: moderator,
      },
    });
  }

  async closeConnect(id: number) {
    return await axios.post(this.connectEndpoint + '/' + id + '/close');
  }
}
