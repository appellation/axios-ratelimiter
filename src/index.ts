import { AxiosAdapter, AxiosRequestConfig, AxiosResponse } from 'axios';
import Bucket from './Bucket';

export interface Headers {
  global: string;
  reset: string;
  limit: string;
  remaining: string;
  retry: string;
}

export interface Config {
  key: (method: string, url: string) => string;
  headers: Headers;
}

export const buckets: Map<string, Bucket> = new Map();

export default (config: Config): AxiosAdapter => {
  return (req: AxiosRequestConfig): Promise<AxiosResponse> => {
    const route = config.key(req.method || 'get', req.url || '');
    let b = buckets.get(route);
    if (!b) {
      b = new Bucket(config.headers);
      buckets.set(route, b);
    }

    return b.enqueue(req);
  }
}
