export interface INotePrepareForSending {
  id?: string;
  content: string;
  module: number;
  user: number;
}

export interface INoteSend {
  state: INotePrepareForSending;
}

export interface INotesSendResponse {
  id: number;
  content: string;
  createdAt: Date;
  module: {
    id: number;
    title: string;
    orderNumber: number;
    createdAt: Date;
  };
  user: {
    id: number;
  };
}
