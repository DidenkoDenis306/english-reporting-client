import { AxiosResponse } from 'axios';
import {
  IAuthResponse,
  ILoginRequestData,
  IRegisterRequestData,
} from './types';
import { APIRoutes } from 'shared/config';
import { http } from 'shared/api';

class AuthService {
  public async login(data: ILoginRequestData): Promise<IAuthResponse> {
    return await http
      .post<AxiosResponse<IAuthResponse>>(APIRoutes.login, data)
      .then((result: AxiosResponse<IAuthResponse, any>) => result.data);
  }

  public async register(data: IRegisterRequestData): Promise<IAuthResponse> {
    return await http
      .post<AxiosResponse<IAuthResponse>>(`/auth/register`, data)
      .then((result: AxiosResponse<IAuthResponse>) => result.data);
  }

  public async refreshAccessToken(
    refreshToken: string,
  ): Promise<IAuthResponse> {
    return await http
      .post<
        AxiosResponse<IAuthResponse>
      >(`/auth/login/access-token`, { refreshToken })
      .then((result: AxiosResponse<IAuthResponse>) => result.data);
  }
}

export const authService = new AuthService();
