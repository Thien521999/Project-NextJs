export interface ASYNC_ACTION_TYPE {
  data?: { [key: string]: any };
  params?: { [key: string]: any };
  cbSuccess?: (...args: Array<any>) => any;
  cbError?: (url: string, error: any) => any;
}

export type HTTP_METHOD_TYPE =
  | "POST"
  | "GET"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS"
  | "PUT"
  | "LINK"
  | "UNLINK"
  | undefined;

export interface REQUEST_TYPE {
    url: string;
    method: HTTP_METHOD_TYPE;
    payload?: { [key: string]: any };
    params?: { [key: string]: any };
    cbSuccess?: (...args: Array<any>) => any;
    cbError?: (url: string, error: any) => any;
    LOADING_ACTION: string;
    SUCCESS_ACTION: string;
    ERROR_ACTION: string;
  }