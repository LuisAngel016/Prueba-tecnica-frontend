import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../http/axios-client";
import type { IHttpClient } from "../interfaces/http-client.interface";

export class AxiosHttpAdapter implements IHttpClient {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await axiosInstance.get<T>(url, config);
  }

  async post<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await axiosInstance.post<T>(url, body, config);
  }

  async patch<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await axiosInstance.patch<T>(url, body, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await axiosInstance.delete<T>(url, config);
  }
}
