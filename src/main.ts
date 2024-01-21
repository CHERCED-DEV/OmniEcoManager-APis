import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CultureInterceptor } from './main/core/interceptors/culture/culture.interceptor';
import { CultureService } from './main/core/services/culture/culture.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS CONFIG
  app.enableCors({
    origin: 'http://localhost:4200', // UI-DOMAIN
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Set the CultureInterceptor to run before other interceptors
  const cultureService = app.get(CultureService);
  app.useGlobalInterceptors(new CultureInterceptor(cultureService));

  await app.listen(3000);
}
bootstrap();
