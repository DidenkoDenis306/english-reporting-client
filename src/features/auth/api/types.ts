export interface ILoginRequestData {
  login: string;
  password: string;
}

export interface IRegisterRequestData {
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  isSpecial: boolean;
}

export interface IAuthResponse {
  user: ICurrentUser;
  accessToken: string;
  refreshToken: string;
}

export interface ICurrentUser {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  isSpecial: boolean;
}
