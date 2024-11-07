export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: number;
}

export interface UsersWithAdminRole {
  name: string;
  id: number;
  role: string;
}
