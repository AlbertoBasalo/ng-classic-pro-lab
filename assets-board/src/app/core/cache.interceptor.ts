import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

interface CacheEntry {
  response: HttpResponse<unknown>;
  timestamp: number;
}

const TTL = 5 * 60 * 1000; // 5 minutes cache TTL
const cache = new Map<string, CacheEntry>();

const getFromCache = (url: string): HttpResponse<unknown> | null => {
  const entry = cache.get(url);
  if (!entry) {
    return null;
  }

  const isExpired = Date.now() - entry.timestamp > TTL;
  if (isExpired) {
    cache.delete(url);
    return null;
  }

  return entry.response;
};

const addToCache = (url: string, response: HttpResponse<unknown>): void => {
  // Don't cache error responses
  if (!response.ok) {
    return;
  }

  const entry: CacheEntry = {
    response: response.clone(),
    timestamp: Date.now()
  };

  cache.set(url, entry);
  console.log('Cache set for', url);
};

export const cacheInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  console.log('Intercepting request', request.url);

  // Only cache GET requests
  if (request.method !== 'GET') {
    return next(request);
  }

  // Check if we should skip cache based on headers
  if (request.headers.get('Cache-Control') === 'no-cache') {
    return next(request);
  }

  const cachedResponse = getFromCache(request.url);
  if (cachedResponse) {
    console.log('Cache hit for', request.url);
    return of(cachedResponse);
  }

  return next(request).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        addToCache(request.url, event);
      }
    })
  );
};
