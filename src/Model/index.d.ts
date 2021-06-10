export interface ILoader {
  id: string;
  message?: string;
  type: string;
  purposeId?: number;
}

export interface IError {
  code?: string;
  message?: string;
  type: string;
  purposeId?: number;
}

export interface IFacebookLogin {
  eventKey: undefined;
  profile: {
    email?: string;
    first_name: string;
    id: string;
    last_name: string;
    name: string;
    name_format: string;
    picture: {
      data: {
        width: number;
        height: number;
        is_silhouette: boolean;
        url: string;
      };
      short_name: string;
    };
  };
  tokenDetail: {
    accessToken: string;
    data_access_expiration_time: number;
    expiresIn: number;
    graphDomain: 'facebook';
    signedRequest: string;
    userID: string;
  };
}

export interface IChangeStateAction {
  id: string;
  code?: string;
  message?: string;
  type: string;
  purposeId?: number;
}
