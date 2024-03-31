import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { HttpsRequests } from '../../types/enums/request.core.enum';

@Injectable()
export class HttpHandlerService {
  private token: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
  ) {}
  public get<T>(
    url: string,
    headers?: { [key: string]: string },
  ): Observable<T> {
    return this.request<T>(HttpsRequests.GET, url, headers);
  }

  public post<T>(
    url: string,
    data: any,
    headers?: { [key: string]: string },
  ): Observable<T> {
    return this.request<T>(HttpsRequests.POST, url, headers, data);
  }

  public put<T>(
    url: string,
    data: any,
    headers?: { [key: string]: string },
  ): Observable<T> {
    return this.request<T>(HttpsRequests.PUT, url, headers, data);
  }

  public delete<T>(
    url: string,
    headers?: { [key: string]: string },
  ): Observable<T> {
    return this.request<T>(HttpsRequests.DELETE, url, headers);
  }

  private request<T>(
    method: HttpsRequests,
    url: string,
    headers?: { [key: string]: string },
    data?: any,
  ): Observable<T> {
    const requestOptions: AxiosRequestConfig = {
      method,
      url,
      headers: {
        ...this.getDefaultHeaders(),
        ...headers,
      },
    };

    if (data !== undefined) {
      requestOptions.data = data;
    }

    return this.httpService.request<T>(requestOptions).pipe(
      map((response: AxiosResponse<T>) => response.data),
      catchError((error) => throwError(error)),
    );
  }

  private getDefaultHeaders(): { [key: string]: string } {
    this.token = this.authService.getToken();
    return {
      'Content-Type': 'application/json',
      Authorization: this.token ? `Bearer ${this.token}` : '',
    };
  }
}
