import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonDataModule } from './main/common/common.static.module';
import { FileManagerService } from './main/core/helpers/file-manager/file-manager.service';
import { HttpHandlerService } from './main/core/helpers/http-handler/http-handler.service';
import { StrapiPopulationService } from './main/core/helpers/strapi-population/strapi-population.service';
import { AuthInterceptor } from './main/core/interceptors/auth/auth.interceptor';
import { CultureInterceptor } from './main/core/interceptors/culture/culture.interceptor';
import { ErrorInterceptor } from './main/core/interceptors/error/on-error.interceptor';
import { AuthService } from './main/core/services/auth/auth.service';
import { CultureService } from './main/core/services/culture/culture.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      isGlobal: true,
    }),
    CommonDataModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CultureInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
    AppService,
    HttpHandlerService,
    FileManagerService,
    StrapiPopulationService,
    CultureService,
    AuthService,
  ],
})
export class AppModule {}
