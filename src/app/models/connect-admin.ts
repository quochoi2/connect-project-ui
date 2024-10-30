export interface IConnectAdmin {
  id: number;
  idFirst: string;
  portSource: string;
  idLast: string;
  portTo: string;
  pending: number;
  status: number;
  moderator: string;
  timeStart: string;
  note: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface IConnectAdminHistory {
  id: number;
  action: string;
  moderator: string;
  connect_id: number;
  createdAt: string;
  updatedAt: string;
}
