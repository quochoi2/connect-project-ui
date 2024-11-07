import { Injectable } from '@angular/core';
import { authService } from '../authService';
import { BaseService } from '../baseService';
import { UsersWithAdminRole } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class userService extends BaseService {
  constructor(authService: authService) {
    super(authService);
  }

  public getUsersWithAdminRole(): Promise<UsersWithAdminRole[]> {
    return this.getAllRepository('/user/getUsersWithAdminRole');
  }
}
