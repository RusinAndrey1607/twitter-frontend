import { UserCreationAttributes, IUser } from "./../interfaces/IUser";
import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + "/auth",
  withCredentials: true,
  // headers: {
  //   authorization: `Bearer ${localStorage.getItem("token")}`,
  // },
});

class AuthService {
  async registration(userBody: UserCreationAttributes): Promise<AuthResponse> {
    const response = await instance.post<any, AxiosResponse<AuthResponse>>(
      "/registration",
      userBody
    );

    return response.data;
  }
  async login(userBody: UserCreationAttributes): Promise<AuthResponse> {
    const response = await instance.post<any, AxiosResponse<AuthResponse>>(
      "/login",
      userBody
    );

    return response.data;
  }
  async auth(): Promise<AuthResponse> {
    const response = await instance.get<any, AxiosResponse<AuthResponse>>("/refresh",);
    return response.data;
  }
  async logout() {
    const response = await instance.get<any, AxiosResponse<AuthResponse>>("/logout",);
    return;
  }
}

export const authService = new AuthService();

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
