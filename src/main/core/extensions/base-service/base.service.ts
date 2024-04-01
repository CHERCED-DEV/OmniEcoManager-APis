import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, catchError, map } from 'rxjs';
import { strapiResponse } from 'src/main/shared/entities/strapi.actions';
import { HttpHandlerService } from '../../helpers/http-handler/http-handler.service';
import { StrapiPopulationService } from '../../helpers/strapi-population/strapi-population.service';

@Injectable()
export abstract class BaseService<T> implements OnModuleInit {
  private cmsCommon: string;

  @Inject(ConfigService)
  private readonly configService: ConfigService;

  @Inject(HttpHandlerService)
  protected httpHandlerService: HttpHandlerService;

  @Inject(StrapiPopulationService)
  protected strapiPopulationService: StrapiPopulationService;

  constructor(
    private apiPath: string,
    private entityKey: string[],
  ) {}

  onModuleInit(): void {
    this.cmsCommon = this.configService.get<string>('CMS', 'default-cms');
    this.apiPath = this.configService.get<string>(this.apiPath);
  }

  protected abstract transformResponse(response: strapiResponse): T;

  protected callStrapi(query: string): Observable<T> {
    return this.httpHandlerService.get(this.cmsCommon + query).pipe(
      map((response: strapiResponse) => this.transformResponse(response)),
      catchError((error) => {
        console.error('Error fetching Strapi data:', error);
        throw error;
      }),
    );
  }

  public getConfig(culture: string): Observable<T> {
    const queryCall: string = this.strapiPopulationService.createQsObject(
      this.apiPath,
      culture,
      this.entityKey,
    );
    return this.callStrapi(queryCall).pipe(
      catchError((error) => {
        console.error('Error in getConfig:', error);
        throw error;
      }),
    );
  }
}
