import axios, { AxiosResponse } from "axios";
import { ITweet } from "../interfaces/ITweet";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + "/tweet",
  withCredentials: true,
});

class TweetService {
  async create(formData: FormData): Promise<ITweet> {
    const response = await instance.post<any, AxiosResponse<ITweet>>(
      "/add",
      formData
    );
    return response.data;
  }
  async getTweets(limit:number = 10, offset:number = 0):Promise<ITweet[]> {
    const response = await instance.get<any, AxiosResponse<ITweet[]>>(`/?limit=${limit}&offset=${offset}`)
    return response.data
  }
}

export const tweetService = new TweetService();

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
