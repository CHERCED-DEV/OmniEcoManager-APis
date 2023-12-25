import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { HttpsRequests } from '../../types/enums/request.core.enum';

@Injectable()
export class HttpHandlerService {
  constructor(private readonly httpService: HttpService) {}
  request<T>(
    method: HttpsRequests,
    url: string,
    token: string | null = null,
    contentType: string = 'application/json',
    body?: any,
  ): Observable<AxiosResponse<T>> {
    const headers: { [key: string]: string } = {
      'Content-Type': contentType,
      Authorization: token ? `Bearer ${token}` : '',
    };

    const config: AxiosRequestConfig = {
      method,
      url,
      headers,
      data: body,
    };
    return this.httpService.request<T>(config);
  }
}
