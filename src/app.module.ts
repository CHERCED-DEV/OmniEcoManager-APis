import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonDataModule } from './main/common/common.static.module';
import { HttpHandlerService } from './main/core/helpers/http-handler/http-handler.service';
import { StrapiPopulationService } from './main/core/helpers/strapi-population/strapi-population.service';
import { CultureMiddleware } from './main/core/middlewares/culture/culture.middleware';
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
    AppService,
    HttpHandlerService,
    CultureService,
    StrapiPopulationService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CultureMiddleware).forRoutes('*');
  }
}
