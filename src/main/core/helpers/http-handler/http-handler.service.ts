import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, catchError, map } from 'rxjs';
import { HttpsRequests } from '../../types/enums/request.core.enum';

@Injectable()
export class HttpHandlerService implements OnModuleInit {
  private token: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    this.token = this.configService.get<string>('TOKEN', 'default-token');
  }

  request<T>(
    method: HttpsRequests,
    url: string,
    contentType: string = 'application/json',
    body?: any,
  ): Observable<T> {
    const headers: { [key: string]: string } = {
      'Content-Type': contentType,
      Authorization: this.token ? `Bearer ${this.token}` : '',
    };
    const config: AxiosRequestConfig = {
      method,
      url,
      headers,
    };

    if (body !== undefined) {
      config.data = body;
    }
    return this.httpService.request<T>(config).pipe(
      map((response: AxiosResponse<T>) => response.data),
      catchError((error) => {
        throw error;
      }),
    );
  }
}
