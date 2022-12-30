import { IProfile } from "./../interfaces/IProfile";
import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + "/profile",
  withCredentials: true,
});

class ProfileService {
  async create(profile: FormData): Promise<IProfile> {
    const response = await instance.post<any, AxiosResponse<IProfile>>(
      "/create",
      profile
    );
    return response.data;
  }
  async update(profile: FormData): Promise<IProfile> {
    const response = await instance.put<any, AxiosResponse<IProfile>>(
      "/update",
      profile
    );
    return response.data;
  }
  async checkUsername(term: string): Promise<boolean> {
    const response = await instance.get(`/check/${term}`);
    return response.data;
  }
  async getProfile(): Promise<IProfile> {
    const response = await instance.get("/");
    return response.data[0];
  }
}

export const profileService = new ProfileService();

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      // @ts-ignore
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
