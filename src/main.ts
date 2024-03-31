import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CultureInterceptor } from './main/core/interceptors/culture/culture.interceptor';
import { CultureService } from './main/core/services/culture/culture.service';
import { INestApplication } from '@nestjs/common';
import { ErrorInterceptor } from './main/core/interceptors/error/on-error.interceptor';
import { AuthInterceptor } from './main/core/interceptors/auth/auth.interceptor';
import { AuthService } from './main/core/services/auth/auth.service';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    configureCors(app);

    configureGlobalInterceptors(app);

    await app.listen(3000);
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error);
    process.exit(1);
  }
}

function configureCors(app: INestApplication) {
  app.enableCors({
    origin: 'http://localhost:4200', // UI-DOMAIN
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
}

function configureGlobalInterceptors(app: INestApplication) {
  const authService = app.get(AuthService);
  const cultureService = app.get(CultureService);
  app.useGlobalInterceptors(
    new ErrorInterceptor(),
    new CultureInterceptor(cultureService),
    new AuthInterceptor(authService),
  );
}

bootstrap();
