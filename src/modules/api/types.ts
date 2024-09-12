import type {
  AxiosResponse as ApiResponse,
  AxiosError as ApiError,
  ResponseType,
} from "axios";

export type HttpFinally = () => void;

export interface HttpResponse {
  callback?(response: ApiResponse): void;
  message?: string;
}

export interface HttpError {
  callback?(error: ApiError): void;
  message?: string;
  noAlert?: boolean | ((error: ApiError) => boolean);
}

export interface HttpRequest {
  url: string;
  method: string;
  data?: object;
  headers?: object;
  responseType?: ResponseType;
  onSuccess?: HttpResponse;
  onError?: HttpError;
  finally?: HttpFinally;
  debounce?: boolean | number;
}

export { ApiResponse, ApiError };
