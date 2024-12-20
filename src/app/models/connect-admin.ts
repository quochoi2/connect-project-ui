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
  timeExpired: Date;
}

export interface IConnectAdminHistory {
  action: string;
  moderator: string;
  connect_id: number;
  createdAt: string;
  updatedAt: string;
}
