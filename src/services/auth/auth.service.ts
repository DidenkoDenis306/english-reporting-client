import { APIRoutes } from '@repo/constants';
import { http } from '@repo/src/http/http-client';
import {
  IAuthResponse,
  ILoginRequestData,
  IRegisterRequestData,
} from '@repo/src/services/auth/auth.types';
import { AxiosResponse } from 'axios';

class AuthService {
  public async login(
    data: ILoginRequestData,
  ): Promise<AxiosResponse<IAuthResponse>> {
    return await http.post<AxiosResponse<IAuthResponse>>(APIRoutes.LOGIN, data);
  }

  public register(
    data: IRegisterRequestData,
  ): Promise<AxiosResponse<IAuthResponse>> {
    return http
      .post<AxiosResponse<IAuthResponse>>(`/auth/register`, data)
      .then((result) => result);
  }

  public refreshAccessToken(refreshToken: string) {
    return http
      .post<
        AxiosResponse<IAuthResponse>
      >(`/auth/login/access-token`, { refreshToken })
      .then((result) => result);
  }
}

export const authService = new AuthService();
