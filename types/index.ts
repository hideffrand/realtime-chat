export interface IMessage {
  id: string;
  userId: string;
  isEdited: boolean;
  text: string;
  datetime: string;
}

export interface IRoom {
  users: [string];
  messages: [IMessage];
}

export interface IUser {
  id: string;
  username: string;
  photoUrl: string;
  contacts?: IUser[];
}
