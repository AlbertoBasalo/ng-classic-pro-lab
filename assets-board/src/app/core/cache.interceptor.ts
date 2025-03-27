import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

interface CacheEntry {
  response: HttpResponse<unknown>;
  timestamp: number;
}

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, CacheEntry>();
  private readonly TTL = 5 * 60 * 1000; // 5 minutes cache TTL

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log('Intercepting request', request.url);

    // Only cache GET requests
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    // Check if we should skip cache based on headers
    if (request.headers.get('Cache-Control') === 'no-cache') {
      return next.handle(request);
    }

    const cachedResponse = this.getFromCache(request.url);
    if (cachedResponse) {
      console.log('Cache hit for', request.url);
      return of(cachedResponse);
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.addToCache(request.url, event);
        }
      })
    );
  }

  private getFromCache(url: string): HttpResponse<unknown> | null {
    const entry = this.cache.get(url);
    if (!entry) {
      return null;
    }

    const isExpired = Date.now() - entry.timestamp > this.TTL;
    if (isExpired) {
      this.cache.delete(url);
      return null;
    }

    return entry.response;
  }

  private addToCache(url: string, response: HttpResponse<unknown>): void {
    // Don't cache error responses
    if (!response.ok) {
      return;
    }

    const entry: CacheEntry = {
      response: response.clone(),
      timestamp: Date.now()
    };

    this.cache.set(url, entry);
    console.log('Cache set for', url);
  }
}
