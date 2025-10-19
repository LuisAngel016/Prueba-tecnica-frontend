
import { AxiosHttpAdapter } from "./adapters/axios-http.adapter";
import type { IHttpClient } from "./interfaces/http-client.interface";

// 👇 Aquí decides qué cliente HTTP se usa globalmente
export const httpClient: IHttpClient = new AxiosHttpAdapter();
